import { useState } from "react";
import type { User } from "@/shared/types/typesReducer.ts";
import { initialUser } from "@/app/store/slices/bankSlice.ts";
import { useLocation, useNavigate } from "react-router-dom";
import arrowBack from "@/shared/icons/arrow.svg";
import style from "./AuthPage.module.css";
import SignUpForm from "@/features/auth/ui/signUpForm/SignUpForm.tsx";
import * as React from "react";
import SignInForm from "@/features/auth/ui/SignInForm/SignInForm.tsx";
import { useTranslation } from "react-i18next";
import { useTheme, useMediaQuery } from "@mui/material";

const AuthPage = () => {
  const { t } = useTranslation();
  const [login, setLogin] = useState<User>(initialUser);
  const navigate = useNavigate();
  const location = useLocation().pathname === "/sign-in";

  const fieldMap: Record<string, keyof User> = {
    password: "password",
    text: "fullName",
    email: "email",
    tel: "phoneNumber",
  };

  // Общая функция обновления
  const updateLogin = (field: keyof User, value: string) => {
    setLogin((prev) => ({ ...prev, [field]: value }));
  };

  // Для старых полей
  const addSignUpInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (!value) return;

    const field = fieldMap[event.target.type];
    if (field) {
      updateLogin(field, event.target.value);
    }
  };

  // Для новых полей
  const addLoginInfo = (value: string, type: string) => {
    const field = fieldMap[type];
    if (field) {
      updateLogin(field, value);
    }
  };

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <div className={`${style.sign} ${isDesktop ? style.desktop : ""}`}>
        <button className={style.linkBack} onClick={() => navigate(-1)}>
          <img className={style.arrow} src={arrowBack} alt="" />
        </button>
        <p className={`${style.signLabel} ${isDesktop ? style.signLabelDesktop : ""}`}>
          {location ? t("signIn") : t("signUp")}
        </p>
        {location ? (
          <SignInForm addLoginInfo={addLoginInfo} login={login} />
        ) : (
          <SignUpForm addLoginInfo={addSignUpInfo} login={login} />
        )}
      </div>
    </>
  );
};

export default AuthPage;
