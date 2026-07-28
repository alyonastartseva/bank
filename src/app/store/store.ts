import { configureStore } from "@reduxjs/toolkit";
import bankSlice from "./slices/bankSlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";
import { baseApi } from "@/entities/user/api/base-api";
import { userApi } from "@/entities/user/api/user-api";
import { baseSettingsApi } from "@/entities/settings/api/base-settings-api";

export const store = configureStore({
  reducer: {
    bank: bankSlice,
    [baseApi.reducerPath]: baseApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [baseSettingsApi.reducerPath]: baseSettingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(localStorageMiddleware)
      .concat(baseApi.middleware)
      .concat(userApi.middleware)
      .concat(baseSettingsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
