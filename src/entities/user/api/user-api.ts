import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User, Registration, CreateRegistrationRequest } from "../model/types";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/account-service/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Registration"],
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (userId) => `/users/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    // Регистрация пользователя
    createUser: build.mutation<Registration, CreateRegistrationRequest>({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body,
      }),
    }),
    // Запрос на смену пароля
    changePassword: build.mutation<void, { oldPassword: string; newPassword: string }>({
      query: (body) => ({
        url: "/users/password-change",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useChangePasswordMutation, useCreateUserMutation } =
  userApi;
