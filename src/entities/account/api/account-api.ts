import { baseApi } from "@/shared/api/baseApi";
import type { Account, CreateAccountRequest, BalanceResponse } from "../model/types";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export const accountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAccountById: build.query<Account, string>({
      query: (id) => API_ENDPOINTS.ACCOUNT.GET_BY_ID(id),
      providesTags: (result, error, id) => [{ type: "Account", id }],
    }),

    getBalance: build.query<BalanceResponse, string>({
      query: (id) => API_ENDPOINTS.ACCOUNT.GET_BALANCE(id),
      providesTags: (result, error, id) => [{ type: "Balance", id }],
    }),

    createAccount: build.mutation<Account, CreateAccountRequest>({
      query: (body) => ({
        url: API_ENDPOINTS.ACCOUNT.CREATE,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Account", id: "LIST" }],
    }),

    blockAccount: build.mutation<Account, { id: string }>({
      query: ({ id }) => ({
        url: API_ENDPOINTS.ACCOUNT.BLOCK(id),
        method: "POST",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Account", id }],
    }),
  }),
});

export const {
  useGetAccountByIdQuery,
  useGetBalanceQuery,
  useCreateAccountMutation,
  useBlockAccountMutation,
} = accountApi;
