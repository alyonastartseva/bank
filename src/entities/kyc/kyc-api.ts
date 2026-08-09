import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/app/store/store";

export const kycApi = createApi({
  reducerPath: "kycApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/kyc-service/api",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.bank.token ?? localStorage.getItem("bank_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    startKyc: build.mutation({
      query: (userId: number) => ({
        url: `/kyc/start?userId=${userId}`,
        method: "POST",
      }),
    }),
    getKycStatus: build.query({
      query: (userId: number) => `/kyc/${userId}`,
    }),
    uploadDocument: build.mutation({
      query: ({ userId, type, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: `/kyc/${userId}/documents?type=${type}`,
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useStartKycMutation, useGetKycStatusQuery, useUploadDocumentMutation } =
  kycApi;
