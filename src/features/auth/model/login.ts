import { authApi } from '@/shared/api/client';
import { tokenService } from './token';
import { getMe } from './getMe';
import type { User } from './types';

export const login = async (email: string, password: string): Promise<User> => {
  const resp = await authApi.loginCreate({ email: email, password } as never);

  if (!resp.data?.access_token) {
    throw new Error('Login failed');
  }

  // только access ; refresh придет в httpOnly cookie
  tokenService.set(resp.data.access_token);

  return getMe();
};
