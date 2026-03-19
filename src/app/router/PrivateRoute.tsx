import { Navigate } from "react-router-dom";
import { routePaths } from "@/shared/config/routePaths";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  // параметр тру на авторизацию
  const isAuth = true;

  if (!isAuth) {
    return <Navigate to={routePaths.login} />;
  }

  return children;
};