import { baseApi } from "@/entities/user/api/base-api";
import moneyTransfer from "@/shared/icons/moneyTransfer.svg";

export interface TransactionResponse {
  id: string;
  sourceAccountId: string;
  targetAccountId: string;
  amount: number;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "COMPENSATED";
  createdAt: string;
  description: string;
}

export interface TransactionPageResponse {
  content: TransactionResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CreateTransactionRequest {
  idempotencyKey: string;
  sourceAccountId: string;
  targetAccountId: string;
  amount: number;
  currency: string;
  description: string;
}

export interface FrontendTransaction {
  id: string;
  icon: string;
  name: string;
  category: string;
  price: string;
}

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<
      FrontendTransaction[],
      { page: number; size: number; accountId?: string }
    >({
      query: ({ page, size, accountId }) => ({
        url: "/transaction-service/transactions",
        method: "GET",
        params: {
          page,
          size,
          ...(accountId && { accountId }),
        },
      }),

      transformResponse: (response: TransactionPageResponse): FrontendTransaction[] => {
        return response.content.map((backendItem) => ({
          id: backendItem.id,
          icon: moneyTransfer,
          name: backendItem.description || "Банковский перевод",
          category: "Транзакция",
          price: `${backendItem.amount} ${backendItem.currency}`,
        }));
      },
    }),

    createTransaction: builder.mutation<TransactionResponse, CreateTransactionRequest>({
      query: (body) => ({
        url: "/transaction-service/transactions",
        method: "POST",
        body,
        headers: {
          "Idempotency-Key": body.idempotencyKey,
        },
      }),
    }),

    deleteTransaction: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/transaction-service/transactions/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;
