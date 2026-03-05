import { baseApi } from "./base-api";
import type { User } from "../model/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // GET /api/users/{id} - информация о пользователе
    getUser: build.query<User, number>({
      query: (userId) => `/account-service/api/users/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
  }),
});

export const { useGetUserQuery } = userApi;
