import type { UserSettings, UpdateUserSettings } from "../model/types";
import { API_ENDPOINTS } from "@/shared/config/endpoints";
import { baseApi } from "@/shared/api/baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSettings: build.query<UserSettings, number>({
      query: (userId) => API_ENDPOINTS.SETTINGS.GET_BY_ID(userId),
      providesTags: (result, error, userId) => [
        {
          type: "Settings",
          id: userId,
        },
      ],
    }),

    createSettings: build.mutation<UserSettings, UserSettings>({
      query: (body) => ({
        url: API_ENDPOINTS.SETTINGS.POST,
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
        url: API_ENDPOINTS.SETTINGS.PATCH_BY_ID(userId),
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
        url: API_ENDPOINTS.SETTINGS.DELETE_BY_ID(userId),
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
