import { useNavigate } from "react-router-dom";
import arrowBack from "@/shared/icons/arrow.svg";
import * as React from "react";
import style from "./ChangePasswordPage.module.css";
import seePassword from "@/shared/icons/seePassword.svg";
import { changeShowPassword } from "@/app/store/slices/bankSlice.ts";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooksReducer.ts";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PasswordState {
  new: string;
  repeat: string;
}

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const showPassword = useAppSelector((state) => state.bank.showPassword);
  const [newPassword, setNewPassword] = useState<PasswordState>({
    new: "",
    repeat: "",
  });

  const passwordSimilarity = () => {
    if (!(newPassword.new === newPassword.repeat)) {
      return (
        <p className={style.passwordRule}>{t("changePassword.passwordMatchError")}</p>
      );
    }
    return <p className={style.passwordRule}></p>;
  };

  return (
    <>
      <div className={style.sign}>
        <div className={style.top}>
          <button className={style.linkBack} onClick={() => navigate(-1)}>
            <img className={style.arrow} src={arrowBack} alt="" />
          </button>
          <p className={style.signLabel}>{t("changePassword.title")}</p>
        </div>
        <form
          className={style.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={style.password}>
            <label className={style.label} htmlFor="password">
              {t("changePassword.currentPassword")}
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={style.passwordInput}
              required
              minLength={6}
              maxLength={20}
              title={t("changePassword.currentPassword")}
            />
          </div>
          <div className={style.password}>
            <label className={style.label} htmlFor="password">
              {t("changePassword.newPassword")}
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={style.passwordInput}
              required
              minLength={6}
              maxLength={20}
              title={t("changePassword.newPassword")}
              onChange={(event) =>
                setNewPassword((prev) => ({
                  ...prev,
                  new: event.target.value,
                }))
              }
            />
            <img
              className={style.seePassword}
              src={seePassword}
              alt=""
              onClick={() => dispatch(changeShowPassword())}
            />
          </div>
          <div className={style.password}>
            <label className={style.label} htmlFor="password">
              {t("changePassword.confirmNewPassword")}
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={style.passwordInput}
              required
              title={t("changePassword.confirmNewPassword")}
              onChange={(event) =>
                setNewPassword((prev) => ({
                  ...prev,
                  repeat: event.target.value,
                }))
              }
            />
            {passwordSimilarity()}
          </div>
          <button type="submit" className={style.button}>
            {t("changePassword.button")}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordPage;
