import { baseApi } from "@/shared/api/baseApi";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export const kycApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    startKyc: build.mutation({
      query: (userId: number) => ({
        url: API_ENDPOINTS.KYC.START(userId),
        method: "POST",
      }),
    }),
    getKycStatus: build.query({
      query: (userId: number) => API_ENDPOINTS.KYC.GET_STATUS(userId),
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
    }),
  }),
});

export const { useStartKycMutation, useGetKycStatusQuery, useUploadDocumentMutation } =
  kycApi;
