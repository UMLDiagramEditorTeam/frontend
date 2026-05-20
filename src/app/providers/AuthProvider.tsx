import { useEffect, useState, type ReactNode } from 'react';
import { tokenService } from '@/features/auth/model/token';
import { getMe } from '@/features/auth/model/getMe';
import { login as loginRequest } from '@/features/auth/model/login';
import { register as registerRequest } from '@/features/auth/model/register';
import { logout as logoutRequest } from '@/features/auth/model/logout';
import type { User } from '@/features/auth/model/types'; // моковый юзер
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!tokenService.getAccess()) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await getMe();
        setUser(me);
      } catch {
        tokenService.clear();
      } finally {
        setIsLoading(false);
      }
    };

    void init();
  }, []);

  const login = async (email: string, password: string) => {
    const me = await loginRequest(email, password);
    setUser(me);
  };

  const register = async (name: string, email: string, password: string) => {
    const me = await registerRequest(name, email, password);
    setUser(me);
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
