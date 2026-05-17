import { baseApi } from "@/entities/user/api/base-api";

export const kycApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    startKyc: build.mutation({
      query: (userId: number) => ({
        url: `/kyc/start?userId=${userId}`,
        method: 'POST',
      }),
    }),
    getKycStatus: build.query({
      query: (userId: number) => `/kyc/${userId}`,
    }),
    uploadDocument: build.mutation({
      query: ({ userId, type, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `/kyc/${userId}/documents?type=${type}`,
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useStartKycMutation, useGetKycStatusQuery, useUploadDocumentMutation } = kycApi;