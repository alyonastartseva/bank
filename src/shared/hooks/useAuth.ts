import { useAppDispatch } from "@/shared/hooks/hooksReducer.ts";
import { changeAuthStatus } from "@/app/store/slices/bankSlice.ts";
import type { User } from "@/shared/types/typesReducer.ts";
import { useNavigate } from "react-router-dom";

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

      const isValid =
        storedUser.email === login.email && storedUser.password === login.password;

      if (isValid) {
        dispatch(changeAuthStatus());
        navigate("/home");
      } else {
        alert("Неверный email или пароль");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      alert("Ошибка при входе. Попробуйте снова.");
    }
  };

  return { signIn };
};

export default useAuth;
