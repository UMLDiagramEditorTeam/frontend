import { authApi } from '@/shared/api/client';
import { tokenService } from './token';

export const logout = async (): Promise<void> => {
  try {
    await authApi.logoutCreate();
  } catch {
    return;
  } finally {
    tokenService.clear();
  }
};
