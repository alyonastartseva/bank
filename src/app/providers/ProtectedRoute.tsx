import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "@/shared/config/routes";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = Boolean(localStorage.getItem("bank_token"));

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.SIGN_IN} replace />;
  }

  return <>{children}</>;
};
