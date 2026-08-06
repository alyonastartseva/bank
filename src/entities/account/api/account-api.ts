import type {
  Account,
  CreateAccountRequest,
  BalanceResponse,
  MyAccountsPageResponse,
} from "../model/types";
import { baseAccountApi } from "@/entities/account/api/base-account-api.ts";

export const accountApi = baseAccountApi.injectEndpoints({
  endpoints: (build) => ({
    // GET /accounts/me - получение счетов
    getMyAccounts: build.query<MyAccountsPageResponse, void>({
      query: () => "/accounts/me",
      providesTags: [{ type: "Account", id: "LIST" }],
    }),

    // GET /accounts/{id} - получение счета
    getAccountById: build.query<Account, string>({
      query: (id) => `/accounts/${id}`,
      providesTags: (result, error, id) => [{ type: "Account", id }],
    }),

    // GET /accounts/{id}/balance - получение баланса
    getBalance: build.query<BalanceResponse, string>({
      query: (id) => `/accounts/${id}/balance`,
      providesTags: (result, error, id) => [{ type: "Balance", id }],
    }),

    // POST /accounts - создание счета
    createAccount: build.mutation<Account, CreateAccountRequest>({
      query: (body) => ({
        url: "/accounts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Account", id: "LIST" }],
    }),

    // POST /accounts/{id}/block - блокировка счета
    blockAccount: build.mutation<Account, { id: string }>({
      query: ({ id }) => ({
        url: `/accounts/${id}/block`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Account", id }],
    }),
  }),
});

export const {
  useGetMyAccountsQuery,
  useGetAccountByIdQuery,
  useGetBalanceQuery,
  useCreateAccountMutation,
  useBlockAccountMutation,
} = accountApi;
