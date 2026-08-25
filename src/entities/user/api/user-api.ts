import { baseApi } from "@/shared/api/baseApi";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import type { User, Registration, CreateRegistrationRequest } from "../model/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, number>({
      query: (userId) => API_ENDPOINTS.USER.GET_BY_ID(userId),
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
        url: API_ENDPOINTS.USER.CHANGE_PASSWORD,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useChangePasswordMutation, useCreateUserMutation } =
  userApi;
