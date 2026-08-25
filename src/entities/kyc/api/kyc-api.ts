import { API_ENDPOINTS } from "@/shared/config/endpoints";
import type { StartKycResponse } from "../model/types";
import { baseKycApi } from "@/entities/kyc/api/base-kys-api.ts";

export const kycApi = baseKycApi.injectEndpoints({
  endpoints: (build) => ({
    startKyc: build.mutation<StartKycResponse, number>({
      query: (userId: number) => ({
        url: API_ENDPOINTS.KYC.START(userId),
        method: "POST",
      }),
      invalidatesTags: (_result, _error, userId) => [{ type: "Kyc", id: userId }],
    }),
    getKycStatus: build.query({
      query: (userId: number) => API_ENDPOINTS.KYC.GET_STATUS(userId),
      providesTags: (_result, _error, userId) => [{ type: "Kyc", id: userId }],
    }),
    uploadDocument: build.mutation({
      query: ({ userId, type, file }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: API_ENDPOINTS.KYC.UPLOAD_DOCUMENT(userId, type),
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: (_result, _error, { userId }) => [{ type: "Kyc", id: userId }],
    }),
  }),
});

export const { useStartKycMutation, useGetKycStatusQuery, useUploadDocumentMutation } =
  kycApi;
