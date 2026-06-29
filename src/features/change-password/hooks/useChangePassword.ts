import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  const { t } = useTranslation();
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

      // Проверяем, что новый пароль отличается от текущего
      if (storedUser.password === data.newPassword) {
        throw new Error(t("changePassword.samePasswordError"));
      }

      // Обновляем пароль в localStorage
      const updatedUser = {
        ...storedUser,
        password: data.newPassword,
      };
      localStorage.setItem("bank_user", JSON.stringify(updatedUser));

      // Показываем сообщение об успехе
      setSuccess(t("changePassword.success"));

      // Возвращаем успешный результат
      return { success: true };

    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : t("changePassword.error");

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