import type { ToastMessage } from "@/shared/types/error";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";

export function mapServerError(
  err: FetchBaseQueryError,
  navigate: ReturnType<typeof useNavigate>
): ToastMessage {
  const status = err.status as number;
  let errorMessage: string | undefined;

  if (err.data && typeof err.data === "object" && "message" in err.data) {
    errorMessage = (err.data as { message?: string }).message;
  }

  if (status >= 500) {
    return {
      type: "error",
      message: "Сервис временно недоступен. Попробуйте позже.",
    };
  }

  if (status === 401) {
    return {
      type: "warning",
      message: "Требуется авторизация. Пожалуйста, войдите в аккаунт.",
      action: { label: "Войти", onClick: () => navigate("/login") },
    };
  }

  if (status === 403) {
    return {
      type: "error",
      message: "У вас нет доступа к этому ресурсу.",
    };
  }

  if (status === 404) {
    return {
      type: "error",
      message: "Запрашиваемые данные не найдены.",
    };
  }

  if (status === 429) {
    return {
      type: "warning",
      message: "Слишком много запросов. Подождите немного и попробуйте снова.",
    };
  }

  return {
    type: "error",
    message: errorMessage || "Произошла ошибка при выполнении запроса.",
  };
}
