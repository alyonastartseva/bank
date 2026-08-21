import type { RootState } from "@/app/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.DEV ? "" : import.meta.env.VITE_API_BASE_URL;

export const baseApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,

    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.bank.token || localStorage.getItem("bank_token");
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");
      headers.set("X-User-Id", "1");
      headers.set("X-User-Type", "USER");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Settings", "Account", "Transaction", "Registration", "Balance"],
  endpoints: () => ({}),
});
