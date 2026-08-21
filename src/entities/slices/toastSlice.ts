// src/store/toastSlice.ts
import { ToastTypeEnum } from "@/shared/types/enums";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ToastPayload {
  message: string;
  type?: ToastTypeEnum;
}

interface ToastState {
  open: boolean;
  message?: string;
  type: ToastTypeEnum;
}

const initialState: ToastState = { open: false, type: ToastTypeEnum.Info };

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<ToastPayload>) => {
      state.open = true;
      state.message = action.payload.message;
      state.type = action.payload.type || ToastTypeEnum.Info;
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
