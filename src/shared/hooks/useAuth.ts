import { useAppDispatch } from "@/shared/hooks/hooksReducer.ts";
import { changeAuthStatus, clearAuthStatus } from "@/entities/slices/bankSlice";
import type { User } from "@/shared/types/typesReducer.ts";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../config/routes";
import { showToast } from "@/entities/slices/toastSlice";

const useAuth = (login: User) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signIn = () => {
    const userStr = localStorage.getItem("bank_user");

    if (!userStr) {
      return;
    }

    try {
      const storedUser = JSON.parse(userStr);

      const isValid = storedUser.email === login.email;

      if (isValid) {
        dispatch(changeAuthStatus());
        localStorage.setItem("bank_token", "hahah");
        navigate("/home");
      } else {
        alert("Неверный email или пароль");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      alert("Ошибка при входе. Попробуйте снова.");
    }
  };

  const signOut = () => {
    localStorage.removeItem("bank_token");
    dispatch(clearAuthStatus());
    navigate(AppRoutes.SIGN_IN);
    dispatch(showToast({ message: "Вы вышли из аккаунта.", type: "info" }));
  };

  return { signIn, signOut };
};

export default useAuth;
