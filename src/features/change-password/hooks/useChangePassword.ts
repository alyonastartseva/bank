import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooksReducer.ts";
import { addUser } from "@/app/store/slices/bankSlice.ts";
import { useChangePasswordMutation } from "@/entities/user/api/user-api";
import { getErrorMessage } from "@/shared/lib/error/get-error-message";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const useChangePassword = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [changePasswordApi] = useChangePasswordMutation();
  const currentUser = useAppSelector((state) => state.bank.user);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const changePassword = async (data: ChangePasswordData) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (!currentUser) {
        throw new Error(t("changePassword.userNotFound") || "Пользователь не найден");
      }

      // Запрос на смену пароля
      await changePasswordApi({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();

      // Обновляем локальное состояние
      const updatedUser = {
        ...currentUser,
        password: data.newPassword,
      };

      // Пока оставляю сохранение в localStorage, так как проблемы с API
      localStorage.setItem("bank_user", JSON.stringify(updatedUser));
      dispatch(addUser(updatedUser));

      setSuccess(t("changePassword.success") || "Пароль успешно изменён");
      return { success: true };
    } catch (error: unknown) {
    const errorMessage = getErrorMessage(
      error,
      t("changePassword.error") || "Не удалось изменить пароль"
    );

    setError(errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
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
