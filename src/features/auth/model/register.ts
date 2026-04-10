import { authApi } from '../api/auth.api';
import { tokenService } from './token';
import { setUser } from './user.store';

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const resp = await authApi.registerCreate({ name, email, password });

  if (!resp.data?.access || !resp.data?.refresh) {
    throw new Error('Register failed');
  }

  tokenService.set(resp.data.access, resp.data.refresh);

  const meResp = await authApi.getAuth();
  if (meResp.data) {
    setUser(meResp.data);
  }
};
