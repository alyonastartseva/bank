import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/shared/hooks/hooksReducer.ts";
import { addUser } from "@/app/store/slices/bankSlice.ts";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const changePassword = async (data: ChangePasswordData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Имитация асинхронного запроса
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Получаем пользователя из localStorage
      const userStr = localStorage.getItem("bank_user");

      if (!userStr) {
        throw new Error(t("changePassword.userNotFound"));
      }

      const storedUser = JSON.parse(userStr);

      // Проверяем, что текущий пароль совпадает
      if (storedUser.password !== data.currentPassword) {
        throw new Error(t("changePassword.wrongCurrentPassword"));
      }

      // Обновляем пароль в localStorage
      const updatedUser = {
        ...storedUser,
        password: data.newPassword,
      };
      localStorage.setItem("bank_user", JSON.stringify(updatedUser));

      // Обновляем пароль в Redux
      dispatch(addUser(updatedUser));

      setSuccess(t("changePassword.success"));

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t("changePassword.error");

      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    changePassword,
    isLoading,
    error,
    success,
  };
};
