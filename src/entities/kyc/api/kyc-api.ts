import type {KycStatus, StartKycResponse} from "../model/types";
import { baseKycApi } from "@/entities/kyc/api/base-kys-api.ts";

export const kycApi = baseKycApi.injectEndpoints({
  endpoints: (build) => ({
    startKyc: build.mutation <StartKycResponse, number>({
      query: (userId: number) => ({
        url: `/kyc/start?userId=${userId}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, userId) => [
        { type: "Kyc", id: userId },
      ],
    }),
    getKycStatus: build.query <KycStatus, number>({
      query: (userId: number) => `/kyc/${userId}`,
      providesTags: (_result, _error, userId) => [
        { type: "Kyc", id: userId },
      ],
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
      invalidatesTags: (_result, _error, { userId }) => [
        { type: "Kyc", id: userId },
      ],
    }),
  }),
});

export const { useStartKycMutation, useGetKycStatusQuery, useUploadDocumentMutation } =
  kycApi;
