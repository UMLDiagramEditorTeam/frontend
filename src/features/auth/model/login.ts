import { mockAuthApi } from '@/shared/api/mock/auth.mock'; // моки
import { tokenService } from './token';
import type { User } from './types'; // моковый юзер

export const login = async (email: string, password: string): Promise<User> => {
  const resp = await mockAuthApi.loginCreate({ email, password });

  if (!resp.data?.access) {
    throw new Error('Login failed');
  }

  // правка - оставляю только access ; refresh придет в httpOnly cookie
  tokenService.set(resp.data.access);

  const meResp = await mockAuthApi.getAuth();

  if (!meResp.data) {
    throw new Error('Failed to fetch user');
  }

  return meResp.data;
};
