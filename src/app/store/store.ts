import { configureStore } from "@reduxjs/toolkit";
import bankSlice from "../../entities/slices/bankSlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";
import { baseApi } from "@/shared/api/baseApi";
import toastSlice from "@/entities/slices/toastSlice";

export const store = configureStore({
  reducer: {
    bank: bankSlice,
    toast: toastSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
