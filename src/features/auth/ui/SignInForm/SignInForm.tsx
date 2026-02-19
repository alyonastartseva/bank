import seePassword from "@/shared/icons/seePassword.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { User } from "@/shared/types/typesReducer.ts";
import style from "./SignInForm.module.css";
import * as React from "react";
import { emailRegex } from "@/shared/lib/validation/rules.ts";

interface SignInFormProps {
  login: User;
  addLoginInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignInForm = ({ login, addLoginInfo }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const signIn = () => {
    const userStr = localStorage.getItem("bank_user");

    if (!userStr) {
      return;
    }

    try {
      const storedUser = JSON.parse(userStr);

      const isValid =
        storedUser.email === login.email && storedUser.password === login.password;

      if (isValid) {
        navigate("/home");
      } else {
        alert("Неверный email или пароль");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
      alert("Ошибка при входе. Попробуйте снова.");
    }
  };

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
          Email Address
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
          Password
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
          onClick={() => setShowPassword((prevState) => !prevState)}
          alt="seePassword"
        />
      </div>
      <button type="submit" className={style.button} onClick={signIn}>
        Sign In
      </button>
      <p className={style.regLink}>
        {"I’m a new user. "}
        <Link className={style.link} to="/sign-up">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
