import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store/store";

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "/api",

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;

      const token =
        state.bank.token ??
        localStorage.getItem("bank_token");

      headers.set("Content-Type", "application/json");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [
    "User",
    "Settings",
    "Account",
    "Transaction",
  ],

  endpoints: () => ({}),
});