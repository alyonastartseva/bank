import {configureStore} from "@reduxjs/toolkit";
import bankSlice from "./slices/bankSlice";
import {localStorageMiddleware} from './middleware/localStorageMiddleware';


export const store = configureStore({
    reducer: {
        bank: bankSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;