import { baseSettingsApi } from "./base-settings-api";
import type { UserSettings, UpdateUserSettings } from "../model/types";

export const settingsApi = baseSettingsApi.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query<UserSettings, number>({
      query: (userId) => `/api/settings/${userId}`,
      providesTags: (result, error, userId) => [
        {
          type: "Settings",
          id: userId,
        },
      ],
    }),

    createSettings: build.mutation<UserSettings, UserSettings>({
      query: (body) => ({
        url: "/api/settings",
        method: "POST",
        body,
      }),
      invalidatesTags: (result) =>
        result
          ? [
              {
                type: "Settings",
                id: result.userId,
              },
            ]
          : [],
    }),

    updateSettings: build.mutation<
      UserSettings,
      {
        userId: number;
        data: UpdateUserSettings;
      }
    >({
      query: ({ userId, data }) => ({
        url: `/api/settings/${userId}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (result, error, { userId }) => [
        {
          type: "Settings",
          id: userId,
        },
      ],
    }),

    deleteSettings: build.mutation<void, number>({
      query: (userId) => ({
        url: `/api/settings/${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, userId) => [
        {
          type: "Settings",
          id: userId,
        },
      ],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useCreateSettingsMutation,
  useUpdateSettingsMutation,
  useDeleteSettingsMutation,
} = settingsApi;
