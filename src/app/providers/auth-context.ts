import { createContext, useContext } from 'react';
import type { User } from '@/features/auth/model/types'; // моковый юзер

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);
