import { baseApi } from "@/entities/user/api/base-api";
import type {
  TransactionResponse,
  CreateTransactionRequest,
} from "@/entities/transaction/model/transaction.types";

export const transactionGatewayApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyAccounts: build.query<
      {
        content: {
          externalId: string;
          balance: number;
          currency: string;
          status: string;
          createdAt: string;
          updatedAt: string;
        }[];
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
      },
      void
    >({
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
