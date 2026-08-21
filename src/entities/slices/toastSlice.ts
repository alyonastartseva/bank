// src/store/toastSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ToastType = "success" | "info" | "warning" | "error";

export interface ToastPayload {
  message: string;
  type?: ToastType;
}

interface ToastState {
  open: boolean;
  message?: string;
  type: ToastType;
}

const initialState: ToastState = { open: false, type: "info" };

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastPayload>) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type || "info";
    },
    closeToast: (state) => {
      state.open = false;
      state.message = undefined;
    },
  },
});

export const { showToast, closeToast } = toastSlice.actions;
export const selectToast = (state: { toast: ToastState }) => state.toast;
export default toastSlice.reducer;
