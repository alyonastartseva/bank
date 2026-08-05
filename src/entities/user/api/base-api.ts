import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");
      headers.set("X-User-Id", "1");
      headers.set("X-User-Type", "USER");
      headers.set("X-Service-Name", "account-service");
      return headers;
    },
  }),
  tagTypes: ["User", "Settings", "Account", "Transaction", "Registration"],
  endpoints: () => ({}),
});
