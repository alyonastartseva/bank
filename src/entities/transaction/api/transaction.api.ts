import type {
  TransactionResponse,
  TransactionPageResponse,
  CreateTransactionRequest,
  TransactionFilters,
} from "../model/transaction.types";
import { baseTransationApi } from "./base-transaction-api";

export const transactionApi = baseTransationApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<TransactionPageResponse, TransactionFilters>({
      query: ({ page, size, accountId, status }) => ({
        url: "/transactions",
        method: "GET",
        params: { page, size, accountId, status },
      }),

      transformErrorResponse: (response) => {
        return response.data || { message: "Произошла сетевая ошибка транзакций" };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: "Transaction" as const, id })),
              { type: "Transaction", id: "LIST" },
            ]
          : [{ type: "Transaction", id: "LIST" }],
    }),

    getTransactionById: builder.query<TransactionResponse, string>({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Transaction", id }],
    }),

    createTransaction: builder.mutation<TransactionResponse, CreateTransactionRequest>({
      query: (body) => ({
        url: "/transactions",
        method: "POST",
        body,
        headers: { "Idempotency-Key": body.idempotencyKey },
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),

    updateTransaction: builder.mutation<
      TransactionResponse,
      { id: string; description: string }
    >({
      query: ({ id, description }) => ({
        url: `/transactions/${id}`,
        method: "PUT",
        body: { description },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Transaction", id },
        { type: "Transaction", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
} = transactionApi;
