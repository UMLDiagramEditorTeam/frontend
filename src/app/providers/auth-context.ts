import { createContext, useContext } from 'react';
import type { User } from '@/shared/api/generated/data-contracts';

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

export const useAuth = () => useContext(AuthContext);
