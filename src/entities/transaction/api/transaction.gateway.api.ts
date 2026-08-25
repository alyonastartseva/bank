import { baseApi } from "@/shared/api/baseApi";
import type {
  TransactionResponse,
  CreateTransactionRequest,
} from "@/entities/transaction/model/transaction.types";
import type { AccountPageResponse } from "@/entities/account/model/types";

export const transactionGatewayApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyAccounts: build.query<AccountPageResponse, void>({
      query: () => "/account-service/api/accounts/me?page=0&size=20",
      providesTags: ["Account"],
    }),

    createTransaction: build.mutation<TransactionResponse, CreateTransactionRequest>({
      query: (body) => ({
        url: "/api/transactions",
        method: "POST",
        headers: {
          "Idempotency-Key": body.idempotencyKey,
        },
        body,
      }),
      invalidatesTags: ["Account", "Transaction"],
    }),
  }),
});

export const { useGetMyAccountsQuery, useCreateTransactionMutation } =
  transactionGatewayApi;
