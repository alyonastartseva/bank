import { baseApi } from "@/shared/api/baseApi";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import type {
  Account,
  CreateAccountRequest,
  BalanceResponse,
  GetMyAccountsQueryParams,
  PaginatedResponse,
} from "../model/types";

export const accountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyAccounts: build.query<
      PaginatedResponse<Account>,
      GetMyAccountsQueryParams | void
    >({
      query: (arg) => {
        const page = arg?.page ?? 0;
        const size = arg?.size ?? 20;
        const sort = arg?.sort ?? ["createdAt,DESC"];
        const userId = arg?.userId ?? 1;

        return {
          url: API_ENDPOINTS.ACCOUNT.GET_MY_ACCOUNTS,
          method: "GET",
          params: {
            ...(userId && { userId }), // Добавит userId только если он передан
            page,
            size,
            sort,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.content.map(({ id }) => ({ type: "Account" as const, id })),
              { type: "Account", id: "LIST" },
            ]
          : [{ type: "Account", id: "LIST" }],
    }),
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
  useGetMyAccountsQuery,
  useGetAccountByIdQuery,
  useGetBalanceQuery,
  useCreateAccountMutation,
  useBlockAccountMutation,
} = accountApi;
