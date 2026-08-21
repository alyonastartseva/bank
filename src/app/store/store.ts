import { configureStore } from "@reduxjs/toolkit";
import bankSlice from "../../entities/slices/bankSlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";
import { baseApi } from "@/entities/user/api/base-api";
import { baseSettingsApi } from "@/entities/settings/api/base-settings-api";
import toastSlice from "@/entities/slices/toastSlice";

export const store = configureStore({
  reducer: {
    bank: bankSlice,
    toast: toastSlice,
    [baseApi.reducerPath]: baseApi.reducer,
    [baseSettingsApi.reducerPath]: baseSettingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(localStorageMiddleware)
      .concat(baseApi.middleware)
      .concat(baseSettingsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
