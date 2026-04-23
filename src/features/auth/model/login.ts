import { authApi } from '../api/auth.api';
import { tokenService } from './token';

export const logout = async () => {
  try {
    await authApi.logoutCreate();
  } finally {
    tokenService.clear();
  }
};
