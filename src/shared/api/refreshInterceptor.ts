import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { tokenService } from '@/features/auth/model/token';
import { routePaths } from '@/shared/config/routePaths';
import type { TokenResponse } from './generated/data-contracts';

type AuthAwareConfig = AxiosRequestConfig & {
  _skipAuthRefresh?: boolean;
  _retried?: boolean;
};

// переменная одна на весь модуль, даже если интерсептор повешен
// на несколько разных axios-инстансов (пометка в client.ts)
let refreshPromise: Promise<string> | null = null;

/**
 * выполняет рефреш через переданный инстанс. помечаем запрос _skipAuthRefresh,
 * чтобы 401 на сам /auth/refresh не зациклился, а попал в ветку logout
 */

const doRefresh = async (instance: AxiosInstance): Promise<string> => {
  const resp = await instance.request<TokenResponse>({
    url: '/auth/refresh',
    method: 'POST',
    _skipAuthRefresh: true,
  } as AuthAwareConfig);

  const newAccess = resp.data?.access_token;
  if (!newAccess) {
    throw new Error('Refresh failed: no access token in response');
  }

  tokenService.set(newAccess);
  return newAccess;
};

const handleAuthFailure = () => {
  tokenService.clear();
  if (
    typeof window !== 'undefined' &&
    window.location.pathname !== routePaths.login
  ) {
    window.location.href = routePaths.login;
  }
};

/**
 * вешает интерсепторы (request + response) на переданный axios-инстанс
 *
 * логика response:
 *  1. не 401 - пропускаем дальше
 *  2. 401 на /auth/refresh - logout
 *  3. 401 на запросе, который уже ретраили - logout
 *  4. 401 обычный - ждём общий refreshPromise (или запускаем новый),
 *     обновляем Authorization у retry, повторяем запрос
 */

export const attachAuthInterceptor = (instance: AxiosInstance): void => {
  // помечаем /auth/refresh флагом, чтобы 401 на него не зациклился
  instance.interceptors.request.use((config) => {
    if (
      config.url === '/auth/refresh' ||
      config.url?.endsWith('/auth/refresh')
    ) {
      (config as AuthAwareConfig)._skipAuthRefresh = true;
    }
    return config;
  });

  // обработка 401
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalConfig = error.config as AuthAwareConfig | undefined;
      const status = error.response?.status;

      // не 401 или нет конфига
      if (status !== 401 || !originalConfig) {
        return Promise.reject(error);
      }

      // сам /auth/refresh вернул 401 , тогда рефреш-кука истекла или невалидна
      if (originalConfig._skipAuthRefresh) {
        handleAuthFailure();
        return Promise.reject(error);
      }

      // если уже обрабатывали запрос
      if (originalConfig._retried) {
        handleAuthFailure();
        return Promise.reject(error);
      }
      originalConfig._retried = true;

      try {
        // если refresh уже идёт, то подписываемся на его промис
        // если нет, то запускаем
        if (!refreshPromise) {
          refreshPromise = doRefresh(instance).finally(() => {
            refreshPromise = null;
          });
        }

        const newAccessToken = await refreshPromise;

        // обновляем Authorization у запроса
        originalConfig.headers = {
          ...(originalConfig.headers || {}),
          Authorization: `Bearer ${newAccessToken}`,
        };

        return instance.request(originalConfig);
      } catch (refreshError) {
        // если рефреш упал
        handleAuthFailure();
        return Promise.reject(refreshError);
      }
    },
  );
};
