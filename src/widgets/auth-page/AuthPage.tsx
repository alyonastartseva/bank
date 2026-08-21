import { useState } from "react";
import type { User, UserBackEnd } from "@/shared/types/typesReducer.ts";
import { initialUser } from "@/entities/slices/bankSlice";
import arrowBack from "@/shared/icons/arrow.svg";
import style from "./AuthPage.module.css";
import SignUpForm from "@/features/auth/ui/signUpForm/SignUpForm.tsx";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface AuthPageProps {
  onSubmit: (data: UserBackEnd) => void;
  isLoading: boolean;
}

const AuthPage = ({ onSubmit, isLoading }: AuthPageProps) => {
  const { t } = useTranslation();
  const [login, setLogin] = useState<User>(initialUser);
  const navigate = useNavigate();

  const fieldMap: Record<string, keyof UserBackEnd> = {
    password: "password",
    text: "fullName",
    email: "email",
    tel: "phoneNumber",
  };

  // Общая функция обновления
  const updateLogin = (field: keyof UserBackEnd, value: string) => {
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

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <div className={`${style.sign} ${isDesktop ? style.desktop : ""}`}>
        <button className={style.linkBack} onClick={() => navigate(-1)}>
          <img className={style.arrow} src={arrowBack} alt="" />
        </button>
        <p className={`${style.signLabel} ${isDesktop ? style.signLabelDesktop : ""}`}>
          {t("signUp")}
        </p>
        <SignUpForm
          addLoginInfo={addSignUpInfo}
          login={login}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default AuthPage;
