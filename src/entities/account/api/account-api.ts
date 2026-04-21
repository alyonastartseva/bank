import { baseApi } from "@/entities/user/api/base-api";
import type { Account } from "../model/types";

export const accountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAccountById: build.query<Account, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Account", id }],
    }),

    createAccount: build.mutation<Account, Omit<Account, "id" | "createdAt">>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Account", id: "LIST" }],
    }),

    blockAccount: build.mutation<Account, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}/block`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Account", id }],
    }),
  }),
});

export const {
  useGetAccountByIdQuery,
  useCreateAccountMutation,
  useBlockAccountMutation,
} = accountApi;
