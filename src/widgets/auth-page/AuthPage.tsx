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

  // Старая функция для совместимости со старой формой регистрации
  const addSignUpInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const notEmptyStr = event.target.value.trim().length > 0;

    if (notEmptyStr) {
      switch (event.target.type) {
        case "password":
          setLogin({
            ...login,
            password: event.target.value,
          });
          break;
        case "text":
          setLogin({
            ...login,
            fullName: event.target.value,
          });
          break;
        case "email":
          setLogin({
            ...login,
            email: event.target.value,
          });
          break;
        case "tel":
          setLogin({
            ...login,
            phoneNumber: event.target.value,
          });
          break;
      }
    }
  };

  // Новая функция для совместимости с новыми полями ввода
  const addLoginInfo = (value: string, type: string) => {
    switch (type) {
      case "password":
        setLogin({
          ...login,
          password: value,
        });
        break;
      case "text":
        setLogin({
          ...login,
          fullName: value,
        });
        break;
      case "email":
        setLogin({
          ...login,
          email: value,
        });
        break;
      case "tel":
        setLogin({
          ...login,
          phoneNumber: value,
        });
        break;
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
