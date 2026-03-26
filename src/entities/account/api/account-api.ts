import { baseApi } from '@/entities/user/api/base-api';
import type { Account } from '../model/types';

export const accountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Получение счета по ID
    getAccountById: build.query<Account, string>({
      query: (id) => `/account-service/api/accounts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Account', id }],
    }),

    // Создание нового счета
    createAccount: build.mutation<Account, Omit<Account, 'id' | 'createdAt'>>({
      query: (body) => ({
        url: '/account-service/api/accounts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Account', id: 'LIST' }],
    }),

    // Блокировка счета
    blockAccount: build.mutation<Account, { id: string }>({
      query: ({ id }) => ({
        url: `/account-service/api/accounts/${id}/block`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Account', id }],
    }),
  }),
});

export const {
  useGetAccountByIdQuery,
  useCreateAccountMutation,
  useBlockAccountMutation,
} = accountApi;