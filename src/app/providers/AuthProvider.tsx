import { useEffect, useState, type ReactNode } from 'react';
import { getMe } from '@/features/auth/model/getMe';
import type { User } from '@/shared/api/generated/data-contracts';
import { AuthContext } from './auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // исправила - пользователя узнаем только по куке
        const me = await getMe();
        setUser(me);
      } catch {
        // 401 - не авторизован
        setUser(null);
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
