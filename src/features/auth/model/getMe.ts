import { authApi } from '../api/auth.api';
import type { User } from '@/shared/api/generated/data-contracts';

export const getMe = async (): Promise<User> => {
  const resp = await authApi.getAuth();

  if (!resp.data) {
    throw new Error('Failed to fetch user');
  }

  return resp.data;
};
