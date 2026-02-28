import { configureStore } from "@reduxjs/toolkit";
import bankSlice from "./slices/bankSlice";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";
import { baseApi } from "@/entities/user/api/base-api"; // ✅ импорт baseApi

export const store = configureStore({
  reducer: {
    bank: bankSlice,
    [baseApi.reducerPath]: baseApi.reducer, // ✅ добавляем редюсер RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware).concat(baseApi.middleware), // ✅ добавляем middleware RTK Query
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
