import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserState, type User } from "@/shared/types/typesReducer.ts";

import apple from "@/shared/icons/apple.svg";
import spotify from "@/shared/icons/spotify.svg";
import moneyTransfer from "@/shared/icons/moneyTransfer.svg";
import cart from "@/shared/icons/cart.svg";

export const initialUser: User = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
};

const user = localStorage.getItem("bank_user");
const token = localStorage.getItem("bank_token");

const initialState: UserState = {
  user: user ? JSON.parse(user) : initialUser,
  token: token || "",
  showPassword: false,
  isAuth: false,
  transactions: [
    {
      id: "1",
      icon: apple,
      name: "Apple",
      category: "Entertainment",
      price: "- $5,99",
    },
    {
      id: "2",
      icon: spotify,
      name: "Spotify",
      category: "Music",
      price: "- $12,99",
    },
    {
      id: "3",
      icon: moneyTransfer,
      name: "Money Transfer",
      category: "Transaction",
      price: "$300",
    },
    {
      id: "4",
      icon: cart,
      name: "Grocery",
      category: "Shop",
      price: "- $88",
    },
  ],
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearUserData: (state) => {
      state.user = initialUser;
      state.token = "";
    },
    changeShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    changeAuthStatus: (state) => {
      state.isAuth = !state.isAuth;
    },
    sellAllTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const { addUser, addToken, clearUserData, changeShowPassword , sellAllTransactions, changeAuthStatus } = bankSlice.actions;

export default bankSlice.reducer;
