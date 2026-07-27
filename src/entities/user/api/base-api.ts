import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
<<<<<<< HEAD
    baseUrl: "/api",
=======
    baseUrl: "/account-service",
>>>>>>> main
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Settings", "Account", "Transaction"],
  endpoints: () => ({}),
});
