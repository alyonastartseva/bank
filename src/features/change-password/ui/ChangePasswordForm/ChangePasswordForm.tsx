import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import style from "./ChangePasswordForm.module.css";
import { PasswordInput } from "@/shared/ui/Input/presets";
import {
  validateRequired,
  validatePassword,
  validatePasswordMatch,
  validateNotSameAsCurrent,
} from "@/shared/ui/Input/validators.ts";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useChangePassword } from "@/features/change-password/hooks/useChangePassword.ts";

const ChangePasswordForm = () => {
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [formSuccess, setFormSuccess] = useState<string>("");

  const { changePassword, isLoading, error, success } = useChangePassword();

  // Проверка, что новый пароль и подтверждение совпадают
  const isPasswordMismatch = newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword !== confirmPassword;

  // Проверка валидности нового пароля через валидатор
  const passwordValidation = validatePassword(newPassword);
  const isNewPasswordValid = passwordValidation.isValid;

  // Проверка, что новый пароль отличается от текущего
  const notSameAsCurrentValidation = validateNotSameAsCurrent(currentPassword)(newPassword);
  const isNotSameAsCurrent = notSameAsCurrentValidation.isValid;

  React.useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  React.useEffect(() => {
    if (success) {
      setFormSuccess(success);
    }
  }, [success]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(""); // Очищаем предыдущее сообщение об успехе

    if (!e.currentTarget.checkValidity()) {
      return;
    }

    if (!isNewPasswordValid) {
      setFormError(passwordValidation.errorText || t("changePassword.error"));
      return;
    }

    if (isPasswordMismatch) {
      setFormError(t("changePassword.passwordMatchError"));
      return;
    }

    if (!isNotSameAsCurrent) {
      setFormError(t("changePassword.samePasswordError"));
      return;
    }

    const result = await changePassword({
      currentPassword,
      newPassword,
    })

    if (result.success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const isButtonDisabled = isLoading ||
    !currentPassword ||
    !isNewPasswordValid ||
    isPasswordMismatch ||
    !isNotSameAsCurrent;

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {formSuccess && (
        <div className={style.successMessage}>
          <span className={style.successIcon}>✓</span>
          {formSuccess}
        </div>
      )}
      <div className={style.password}>
        <PasswordInput
          label={t("changePassword.currentPassword")}
          value={currentPassword}
          onChange={setCurrentPassword}
          type={passwordVisible ? "text" : "password"}
          validate={validateRequired}
          required
          disabled={isLoading}
          startAdornment={<LockOutlinedIcon sx={{ fill: "#868686", width: 16 }} />}
        />
      </div>

      <div className={style.password}>
        <PasswordInput
          label={t("changePassword.newPassword")}
          value={newPassword}
          onChange={setNewPassword}
          type={passwordVisible ? "text" : "password"}
          validate={validatePassword}
          required
          minLength={6}
          maxLength={20}
          disabled={isLoading}
          startAdornment={<LockOutlinedIcon sx={{ fill: "#868686", width: 16 }} />}
          endAdornment={
            passwordVisible ? (
              <VisibilityOffOutlinedIcon
                sx={{ fill: "#868686", width: 16, cursor: "pointer" }}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <VisibilityOutlinedIcon
                sx={{ fill: "#868686", width: 16, cursor: "pointer" }}
                onClick={togglePasswordVisibility}
              />
            )
          }
          helperText={t("changePassword.passwordRequirements")}
        />
      </div>

      <div className={style.password}>
        <PasswordInput
          label={t("changePassword.confirmNewPassword")}
          value={confirmPassword}
          onChange={setConfirmPassword}
          type={passwordVisible ? "text" : "password"}
          validate={validatePasswordMatch(newPassword)}
          required
          disabled={isLoading}
          error={isPasswordMismatch}
          helperText={isPasswordMismatch ? t("changePassword.passwordMatchError") : ""}
          startAdornment={<LockOutlinedIcon sx={{ fill: "#868686", width: 16 }} />}
        />
      </div>

      {/* Сообщение о том, что пароль не отличается от текущего */}
      {!isNotSameAsCurrent && newPassword.length > 0 && (
        <p className={style.passwordRule}>
          {t("changePassword.samePasswordError")}
        </p>
      )}

      {/* Общая ошибка формы */}
      {formError && (
        <p className={style.passwordRule}>{formError}</p>
      )}

      <button
        type="submit"
        className={style.button}
        disabled={isButtonDisabled}
      >
        {isLoading ? t("changePassword.submitting") : t("changePassword.button")}
      </button>
    </form>
  );
};

export default ChangePasswordForm;