import type { User } from "../model/types";
import { baseApi } from "@/shared/api/baseApi";
import { API_ENDPOINTS } from "@/shared/config/endpoints";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (userId) => API_ENDPOINTS.USER.GET_BY_ID(userId),
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    // Запрос на смену пароля
    changePassword: build.mutation<void, { oldPassword: string; newPassword: string }>({
      query: (body) => ({
        url: API_ENDPOINTS.ACCOUNT.CHANGE_PASSWORD,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery } = userApi;
export const { useChangePasswordMutation } = userApi;
