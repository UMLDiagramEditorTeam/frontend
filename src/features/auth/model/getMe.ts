import { authApi } from '@/shared/api/client';
import type { User } from './types';

export const getMe = async (): Promise<User> => {
  const resp = await authApi.getAuth();

  if (!resp.data) {
    throw new Error('Failed to fetch user');
  }

  return resp.data;
};
