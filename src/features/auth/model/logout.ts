import { authApi } from '../api/auth.api';
import { tokenService } from './token';
import { clearUser } from './user.store';

export const logout = async () => {
  try {
    await authApi.logoutCreate();
  } finally {
    tokenService.clear();
    clearUser();
  }
};
