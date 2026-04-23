import { authApi } from '../api/auth.api';
import { tokenService } from './token';
import type { User } from '@/shared/api/generated/data-contracts';

export const login = async (email: string, password: string): Promise<User> => {
  const resp = await authApi.loginCreate({ email, password });

  if (!resp.data?.access || !resp.data?.refresh) {
    throw new Error('Login failed');
  }

  tokenService.set(resp.data.access, resp.data.refresh);

  const meResp = await authApi.getAuth();

  if (!meResp.data) {
    throw new Error('Failed to fetch user');
  }

  return meResp.data; // возвращаем пользоваля
};
