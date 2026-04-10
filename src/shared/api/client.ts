import { HttpClient } from './generated/http-client';
import { tokenService } from '@/features/auth/model/token';

export const httpClient = new HttpClient({
  baseURL: 'https://virtserver.swaggerhub.com/bbb-7fb/spec/1.1.1',

  securityWorker: async () => {
    const access = tokenService.getAccess();

    return access
      ? {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      : {};
  },
});
