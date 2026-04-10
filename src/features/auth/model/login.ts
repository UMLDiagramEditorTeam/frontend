import { authApi } from '../api/auth.api';
import { tokenService } from './token';
import { setUser } from './user.store';

export const login = async (email: string, password: string) => {
  const resp = await authApi.loginCreate({ email, password });

  if (!resp.data?.access || !resp.data?.refresh) {
    throw new Error('Login failed');
  }

  tokenService.set(resp.data.access, resp.data.refresh);

  const meResp = await authApi.getAuth(); // ✅ getAuth
  if (meResp.data) {
    setUser(meResp.data);
  }
};
