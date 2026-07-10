import { baseApi } from "./base-api";
import type { User } from "../model/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET /api/users/{id} - информация о пользователе
    getUser: build.query<User, number>({
      query: (userId) => `/api/users/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    // Запрос на смену пароля
    changePassword: build.mutation<void, { oldPassword: string; newPassword: string }>({
      query: (body) => ({
        url: "/api/users/password-change",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
export const { useChangePasswordMutation } = userApi;
