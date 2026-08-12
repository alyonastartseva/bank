import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAccountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/account-service/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");
      headers.set("X-User-Id", "1");
      headers.set("X-User-Type", "USER");
      headers.set("X-Service-Name", "account-service");
      return headers;
    },
  }),
  tagTypes: ["Account", "Balance"],
  endpoints: () => ({}),
});
