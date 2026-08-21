import type { ToastMessage } from "@/shared/types/error";
import type { SerializedError } from "vitest";

export function mapGenericError(err: SerializedError): ToastMessage {
  const msg = err.message || String(err);

  if (msg.includes("ECONNRESET") || msg.includes("network") || msg.includes("timeout")) {
    return {
      type: "error",
      message: "Нет соединения с сервером. Проверьте интернет и повторите попытку.",
    };
  }

  return {
    type: "error",
    message: "Что-то пошло не так. Попробуйте ещё раз.",
  };
}
