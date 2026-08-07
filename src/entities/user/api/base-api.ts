import type { RootState } from "@/app/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/account-service/api",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");
      headers.set("X-User-Id", "1");
      headers.set("X-User-Type", "USER");
      headers.set("X-Service-Name", "account-service");

      const token = (getState() as RootState).bank.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Settings", "Account", "Transaction", "Registration", "Balance"],
  endpoints: () => ({}),
});
