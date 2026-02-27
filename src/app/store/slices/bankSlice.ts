import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type UserState, type User } from "@/shared/types/typesReducer.ts";

export const initialUser: User = {
  fullName: "",
  email: "",
  password: "",
  phoneNumber: "",
};

const user = localStorage.getItem("bank_user");
const token = localStorage.getItem("bank_token");

const initialState: UserState = {
    user:  user ?  JSON.parse(user) : initialUser,
    token: token || '',
    signType: true,
    showPassword: false,
}

const bankSlice = createSlice({
    name: "bank",
    initialState,
    reducers: {
        addUser: (state, action:PayloadAction<User>) => {
            state.user = action.payload;
        },
        addToken: (state, action:PayloadAction<string>) => {
            state.token = action.payload;
        },
        clearUserData: (state) => {
            state.user = initialUser;
            state.token = "";
        },
        changeShowPassword: (state) => {
            state.showPassword = !state.showPassword;
        }
    }
})

export const {
    addUser,
    addToken,
    clearUserData,
    changeShowPassword
} = bankSlice.actions;


export default bankSlice.reducer;
