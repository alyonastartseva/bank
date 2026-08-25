import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAccountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/account-service/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = localStorage.getItem("bank_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Account", "Balance"],
  endpoints: () => ({}),
});
