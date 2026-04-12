import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { routePaths } from '@/shared/config/routePaths';
import { tokenService } from '@/features/auth/model/token';

type Props = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const isAuth = !!tokenService.getAccess();

  if (!isAuth) {
    return <Navigate to={routePaths.login} replace />;
  }

  return <>{children}</>;
};
