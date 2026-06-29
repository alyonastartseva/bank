import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const USER_ID = "13445d6b-e829-4c1b-9973-70cf49c6c985";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/account-service/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");
      headers.set("X-User-Id", USER_ID);
      headers.set("X-User-Type", "USER");
      headers.set("X-Service-Name", "account-service");
      return headers;
    },
  }),
  tagTypes: ["User", "Settings", "Account", "Balance"],
  endpoints: () => ({}),
});
