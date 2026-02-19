import type {ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "../../shared/config/routes";

interface ProtectedRouteProps {
  children: ReactNode;
  isAllowed: boolean;
}

export const ProtectedRoute = ({
  children,
  isAllowed,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={AppRoutes.SIGN_IN} replace />;
  }

  return <>{children}</>;
};
