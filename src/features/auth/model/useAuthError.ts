import { useState, useCallback } from 'react';

export interface AuthErrorState {
  message: string;
  retry: (() => Promise<void>) | null;
}

export const useAuthError = () => {
  const [errorState, setErrorState] = useState<AuthErrorState | null>(null);

  const handleError = useCallback(
    (error: unknown, retry: () => Promise<void>) => {
      const message =
        error instanceof Error ? error.message : 'Неизвестная ошибка';
      setErrorState({ message, retry });
    },
    [],
  );

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  return { errorState, handleError, clearError };
};
