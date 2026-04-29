import { authApi } from '../api/auth.api';
import type { User } from '@/shared/api/generated/data-contracts';

export const login = async (email: string, password: string): Promise<User> => {
  await authApi.loginCreate({ email, password });
  const meResp = await authApi.getAuth();

  if (!meResp.data) {
    throw new Error('Failed to fetch user');
  }

  return meResp.data;
};
