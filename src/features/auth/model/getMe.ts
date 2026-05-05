import { mockAuthApi } from '@/shared/api/mock/auth.mock'; // моки
import type { User } from './types'; // моковый юзер

export const getMe = async (): Promise<User> => {
  const resp = await mockAuthApi.getAuth();

  if (!resp.data) {
    throw new Error('Failed to fetch user');
  }

  return resp.data;
};
