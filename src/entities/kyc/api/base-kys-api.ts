import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store/store";

export const baseKycApi = createApi({
  reducerPath: "kycApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/kyc-service/api",

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
    "Kyc"
  ],

  endpoints: () => ({}),
});