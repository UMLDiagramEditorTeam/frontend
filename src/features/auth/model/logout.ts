import { authApi } from '../api/auth.api';

export const logout = async (): Promise<void> => {
  await authApi.logoutCreate();
};
