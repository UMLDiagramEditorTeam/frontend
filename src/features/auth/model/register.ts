import { authApi } from '@/shared/api/client';
import type { User } from './types';

export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  // от бэка - автологина нет - после регистрации UI должен вести на /login
  const resp = await authApi.registerCreate({ name, email, password });

  if (!resp.data) {
    throw new Error('Register failed');
  }

  return resp.data;
};
