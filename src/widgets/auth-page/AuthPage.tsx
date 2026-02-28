import { useState } from "react";
import type { User } from "@/shared/types/typesReducer.ts";
import { useAppSelector } from "@/shared/hooks/hooksReducer.ts";
import { initialUser } from "@/app/store/slices/bankSlice.ts";
import { Link } from "react-router-dom";
import arrowBack from "@/shared/icons/arrow.svg";
import style from "./AuthPage.module.css";
import SignUpForm from "@/features/auth/ui/signUpForm/SignUpForm.tsx";
import * as React from "react";

const AuthPage = () => {
  const signType = useAppSelector((state) => state.bank.signType);
  const [login, setLogin] = useState<User>(initialUser);

  const addLoginInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <>
      <div className={style.sign}>
        <Link className={style.linkBack} to={signType ? "/" : "/sign-in"}>
          <img className={style.arrow} src={arrowBack} alt="" />
        </Link>
        <p className={style.signLabel}>{signType ? "Sign In" : "Sign Up"}</p>
        {signType ? <></> : <SignUpForm addLoginInfo={addLoginInfo} login={login} />}
      </div>
    </>
  );
};

export default AuthPage;
