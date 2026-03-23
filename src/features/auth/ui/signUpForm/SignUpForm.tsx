import type { User } from "@/shared/types/typesReducer.ts";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooksReducer.ts";
import {
  addToken,
  addUser,
  changeShowPassword,
  initialUser,
} from "@/app/store/slices/bankSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import seePassword from "@/shared/icons/seePassword.svg";
import style from "./SignUpForm.module.css";
import { emailRegex, nameRegex, phoneRegex } from "@/shared/lib/validation/rules.ts";
import * as React from "react";
import { useTranslation } from "react-i18next";

interface SignUpFormProps {
  login: User;
  addLoginInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpForm = ({ login, addLoginInfo }: SignUpFormProps) => {
  const dispatch = useAppDispatch();
  const showPassword = useAppSelector((state) => state.bank.showPassword);
  const user = useAppSelector((state) => state.bank.user);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const addUsers = () => {
    if (!login.fullName || !login.email || !login.password || !login.phoneNumber) {
      alert("Пожалуйста заполните все поля");
      return;
    }
    const userArr = JSON.stringify(user);
    const loginArr = JSON.stringify(login);
    const initialUserArr = JSON.stringify(initialUser);

    if (userArr !== loginArr && loginArr !== initialUserArr) {
      dispatch(addUser(login));
      dispatch(addToken(Math.random().toString(36).substring(2)));
      navigate("/sign-in");
    }
  };

  return (
    <form
      className={style.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
          addUsers();
        }
      }}
    >
      <div className={style.fullName}>
        <label className={style.label} htmlFor="fullName">
          {t("fullName")}
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          className={style.fullNameInput}
          required
          pattern={nameRegex.source}
          title="Имя должно содержать только буквы, пробелы и дефисы"
          maxLength={30}
          onChange={(event) => addLoginInfo(event)}
        />
      </div>
      <div className={style.phone}>
        <label className={style.label} htmlFor="phone">
          {t("phoneNumber")}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={style.phoneInput}
          required
          pattern={phoneRegex.source}
          title="Введите 11 цифр номера телефона"
          maxLength={11}
          onChange={(event) => addLoginInfo(event)}
        />
      </div>
      <div className={style.email}>
        <label className={style.label} htmlFor="email">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={style.emailInput}
          required
          pattern={emailRegex.source}
          title="Введите корректный email (например: name@example.com)"
          maxLength={30}
          onChange={(event) => addLoginInfo(event)}
        />
      </div>
      <div className={style.password}>
        <label className={style.label} htmlFor="password">
          {t("password")}
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          className={style.passwordInput}
          required
          minLength={6}
          maxLength={20}
          title="Пароль должен содержать от 6 до 20 символов"
          onChange={(event) => addLoginInfo(event)}
        />
        <img
          className={style.seePassword}
          src={seePassword}
          alt=""
          onClick={() => dispatch(changeShowPassword())}
        />
      </div>
      <button type="submit" className={style.button}>
        {t("signUp")}
      </button>
      <p className={style.regLink}>
        {t("iAmNewUser")}{" "}
        <Link className={style.link} to="/sign-in">
          {t("signIn")}
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
