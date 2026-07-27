import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseSettingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/user-settings-service",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Settings"],
  endpoints: () => ({}),
});
