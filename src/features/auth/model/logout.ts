import { authApi } from '../api/auth.api';
import { tokenService } from './token';

export const logout = async (): Promise<void> => {
  try {
    await authApi.logoutCreate();
  } finally {
    tokenService.clear();
  }
};
