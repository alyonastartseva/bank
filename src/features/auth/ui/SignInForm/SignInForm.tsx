import seePassword from "@/shared/icons/seePassword.svg";
import { Link } from "react-router-dom";
import type { User } from "@/shared/types/typesReducer.ts";
import style from "./SignInForm.module.css";
import * as React from "react";
import { emailRegex } from "@/shared/lib/validation/rules.ts";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooksReducer.ts";
import { changeShowPassword } from "@/app/store/slices/bankSlice.ts";
import useAuth from "@/shared/hooks/useAuth.ts";
import { useTranslation } from 'react-i18next';

interface SignInFormProps {
  login: User;
  addLoginInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}



const SignInForm = ({ login, addLoginInfo }: SignInFormProps) => {
  const showPassword = useAppSelector((state) => state.bank.showPassword);
  const dispatch = useAppDispatch();
  const { signIn } = useAuth(login);
  const { t } = useTranslation();

  return (
    <form
      className={style.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
          signIn();
        }
      }}
    >
      <div className={style.email}>
        <label className={style.label} htmlFor="email">
          {t('email')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={style.emailInput}
          pattern={emailRegex.source}
          required
          onChange={(event) => addLoginInfo(event)}
        />
      </div>
      <div className={style.password}>
        <label className={style.label} htmlFor="password">
          {t('password')}
        </label>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          className={style.passwordInput}
          required
          onChange={(event) => addLoginInfo(event)}
        />
        <img
          className={style.seePassword}
          src={seePassword}
          onClick={() => dispatch(changeShowPassword())}
          alt="seePassword"
        />
      </div>
      <button type="submit" className={style.button} onClick={signIn}>
        {t('signIn')}
      </button>
      <p className={style.regLink}>
        {t('iAmNewUser')}{' '}
        <Link className={style.link} to="/sign-up">
          {t('signUp')}
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
