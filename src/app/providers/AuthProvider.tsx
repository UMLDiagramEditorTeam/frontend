import { useEffect, useState, type ReactNode } from 'react';
import { tokenService } from '@/features/auth/model/token';
import { getMe } from '@/features/auth/model/getMe';
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

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
