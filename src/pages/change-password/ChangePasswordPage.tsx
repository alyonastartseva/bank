import * as React from "react";
import style from "./ChangePasswordPage.module.css";
import ChangePasswordForm from "@/features/change-password/ui/ChangePasswordForm/ChangePasswordForm.tsx";

const ChangePasswordPage = () => {  
  return (
    <div className={style.container}>
      <ChangePasswordForm />
    </div>
  );
};

export default ChangePasswordPage;
