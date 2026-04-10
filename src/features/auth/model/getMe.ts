import { authApi } from '../api/auth.api';
import { setUser } from './user.store';

export const getMe = async () => {
  const resp = await authApi.getAuth();
  if (resp.data) {
    setUser(resp.data);
  }
  return resp.data;
};
