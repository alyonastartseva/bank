import { useNavigate } from "react-router-dom";
import arrowBack from "@/shared/icons/arrow.svg";
import * as React from "react";
import style from "./ChangePasswordPage.module.css";
import { useTranslation } from "react-i18next";
import ChangePasswordForm from "@/features/change-password/ui/ChangePasswordForm/ChangePasswordForm.tsx";

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={style.container}>
        <div className={style.top}>
          <button className={style.linkBack} onClick={() => navigate(-1)}>
            <img className={style.arrow} src={arrowBack} alt="" />
          </button>
          <p className={style.signLabel}>{t("changePassword.title")}</p>
        </div>

        <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
