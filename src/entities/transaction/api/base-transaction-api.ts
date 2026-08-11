import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseTransationApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/transaction-service/api/v1",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "*/*");
      headers.set("X-Service-Name", "transation-service");
      return headers;
    },
  }),
  tagTypes: ["Transaction"],
  endpoints: () => ({}),
});
