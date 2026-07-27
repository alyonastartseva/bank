import { Navigate } from "react-router-dom";
import { AppRoutes } from "@/shared/config/routes";

export const RootRedirect = () => {
  const isAuthenticated = Boolean(localStorage.getItem("bank_token"));

  return <Navigate to={isAuthenticated ? AppRoutes.HOME : AppRoutes.SIGN_IN} replace />;
};
