import { configureStore } from "@reduxjs/toolkit";
import bankSlice from "./slices/bankSlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";
import { baseApi } from "@/shared/api/baseApi";

export const store = configureStore({
  reducer: {
    bank: bankSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
