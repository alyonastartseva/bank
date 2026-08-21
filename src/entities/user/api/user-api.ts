import type { User, Registration, CreateRegistrationRequest } from "../model/types";
import { baseApi } from "./base-api";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (userId) => `/users/${userId}`,
      providesTags: (result, error, userId) => [{ type: "User", id: userId }],
    }),
    createUser: build.mutation<Registration, CreateRegistrationRequest>({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
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
