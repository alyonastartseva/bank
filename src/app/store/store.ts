import { configureStore } from "@reduxjs/toolkit";
import bankSlice from "../../entities/slices/bankSlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";
import { baseApi } from "@/shared/api/baseApi";
import { baseKycApi } from "@/entities/kyc/api/base-kys-api";
import toastSlice from "@/entities/slices/toastSlice";

export const store = configureStore({
  reducer: {
    bank: bankSlice,
    toast: toastSlice,
    [baseApi.reducerPath]: baseApi.reducer,
    [baseKycApi.reducerPath]: baseKycApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(localStorageMiddleware)
      .concat(baseApi.middleware)
      .concat(baseKycApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
