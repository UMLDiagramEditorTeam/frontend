import { authApi } from '@/shared/api/client';
import type { User } from './types';

export const confirmAccount = async (
  userId: string,
  code: string,
): Promise<User> => {
  const resp = await authApi.request<User>({
    path: '/auth/confirm-account',
    method: 'POST',
    query: {
      user_id: userId,
      code,
    },
    secure: true,
    format: 'json',
  });

  if (!resp.data) {
    throw new Error('Не удалось подтвердить аккаунт');
  }

  return resp.data;
};
