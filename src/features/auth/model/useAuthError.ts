import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

export interface AuthErrorState {
  message: string;
  status?: number;
  retry: (() => Promise<void>) | null;
}

const extractErrorMessage = (error: unknown): string => {
  // axios-овая ошибка
  if (error instanceof AxiosError && error.response) {
    const data = error.response.data;

    if (data && typeof data === 'object') {
      // ErrorResponse: { message, detail }
      if (typeof data.message === 'string' && data.message) {
        return data.message;
      }

      // detail может быть строкой
      if (typeof data.detail === 'string' && data.detail) {
        return data.detail;
      }

      // detail как массив - собираем в строку
      if (Array.isArray(data.detail) && data.detail.length > 0) {
        const messages = data.detail
          .map((item: { field?: string; message?: string; msg?: string }) => {
            const field = item.field ?? '';
            const msg = item.message ?? item.msg ?? '';
            return field ? `${field}: ${msg}` : msg;
          })
          .filter(Boolean);
        if (messages.length > 0) return messages.join('; ');
      }

      // вложенный формат ErrorResponseError: { error: { code, message } }
      if (
        data.error &&
        typeof data.error === 'object' &&
        typeof data.error.message === 'string'
      ) {
        return data.error.message;
      }
    }

    // если в data вообще ничего нет — fallback на статус
    if (error.message) return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Undefined error';
};

const extractStatus = (error: unknown): number | undefined => {
  if (error instanceof AxiosError) return error.response?.status;
  return undefined;
};

export const useAuthError = () => {
  const [errorState, setErrorState] = useState<AuthErrorState | null>(null);

  const handleError = useCallback(
    (error: unknown, retry: () => Promise<void>) => {
      setErrorState({
        message: extractErrorMessage(error),
        status: extractStatus(error),
        retry,
      });
    },
    [],
  );

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  return { errorState, handleError, clearError };
};
