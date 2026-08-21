import { useState } from "react";
import type { User, UserBackEnd } from "@/shared/types/typesReducer.ts";
import { initialUser } from "@/entities/slices/bankSlice";
import { useNavigate } from "react-router-dom";
import arrowBack from "@/shared/icons/arrow.svg";
import style from "./SignInPage.module.css";
import SignInForm from "@/features/auth/ui/SignInForm/SignInForm.tsx";
import { useTranslation } from "react-i18next";
import { useTheme, useMediaQuery } from "@mui/material";

const SignInPage = () => {
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
          {t("signIn")}
        </p>
        <SignInForm addLoginInfo={addLoginInfo} login={login} />
      </div>
    </>
  );
};

export default SignInPage;
