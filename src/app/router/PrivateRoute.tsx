import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { routePaths } from '@/shared/config/routePaths';
import { useAuth } from '@/app/providers/auth-context';

type Props = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to={routePaths.login} replace />;
  }

  return <>{children}</>;
};
