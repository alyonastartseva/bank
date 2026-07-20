import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

// Проверка ошибки
export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | unknown,
  fallback: string
): string {
  if (typeof error === "object" && error !== null && "status" in error) {
    const data = (error as FetchBaseQueryError).data;

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
