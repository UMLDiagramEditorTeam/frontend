import { Navigate } from 'react-router-dom';
import { routePaths } from '@/shared/config/routePaths';
import type { ReactNode } from 'react';
import { getUser } from '@/features/auth/model/user.store';

type Props = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const user = getUser();

  if (!user) {
    return <Navigate to={routePaths.login} replace />;
  }

  return children;
};
