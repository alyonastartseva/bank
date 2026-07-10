import React, { useState, useCallback } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { changePassword, error, success } = useChangePassword();

  const passwordValidation = validatePassword(newPassword);
  const isNewPasswordValid = passwordValidation.isValid;

  const notSameAsCurrentValidation =
    validateNotSameAsCurrent(currentPassword)(newPassword);
  const isNotSameAsCurrent = notSameAsCurrentValidation.isValid;

  const isPasswordMismatch =
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    newPassword !== confirmPassword;

  const isFormValid =
    isNewPasswordValid &&
    !isPasswordMismatch &&
    isNotSameAsCurrent &&
    currentPassword.length > 0;

  const handleFieldChange = useCallback(
    (setter: (value: string) => void) => (value: string) => {
      setter(value);
      setFormError("");
    },
    []
  );

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.checkValidity()) return;
    if (!isFormValid) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await changePassword({
        currentPassword,
        newPassword,
      });

      if (!result.success) {
        setFormError(result.error ?? "Ошибка при смене пароля");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setFormError("");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Неожиданная ошибка. Попробуйте ещё раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisible((prev) => !prev);
  }, []);

  const iconSx = { fill: "#868686", width: 16 };
  const eyeIconSx = { fill: "#868686", width: 16, cursor: "pointer" };

  return (
    <form className={style.form} onSubmit={handleSubmit} noValidate>
      {/* Сообщение об успехе */}
      {success && (
        <div className={style.successMessage}>
          <span className={style.successIcon}>✓</span>
          {success}
        </div>
      )}

      {/* Текущий пароль */}
      <div className={style.field}>
        <PasswordInput
          label={t("changePassword.currentPassword")}
          value={currentPassword}
          onChange={handleFieldChange(setCurrentPassword)}
          type={passwordVisible ? "text" : "password"}
          validate={validateRequired}
          required
          disabled={isSubmitting}
          startAdornment={<LockOutlinedIcon sx={iconSx} />}
        />
      </div>

      {/* Новый пароль */}
      <div className={style.field}>
        <PasswordInput
          label={t("changePassword.newPassword")}
          value={newPassword}
          onChange={handleFieldChange(setNewPassword)}
          type={passwordVisible ? "text" : "password"}
          validate={validatePassword}
          required
          minLength={6}
          maxLength={20}
          disabled={isSubmitting}
          startAdornment={<LockOutlinedIcon sx={iconSx} />}
          endAdornment={
            passwordVisible ? (
              <VisibilityOffOutlinedIcon
                sx={eyeIconSx}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <VisibilityOutlinedIcon sx={eyeIconSx} onClick={togglePasswordVisibility} />
            )
          }
          helperText={t("changePassword.passwordRequirements")}
        />
      </div>

      {/* Подтверждение нового пароля */}
      <div className={style.field}>
        <PasswordInput
          label={t("changePassword.confirmNewPassword")}
          value={confirmPassword}
          onChange={handleFieldChange(setConfirmPassword)}
          type={passwordVisible ? "text" : "password"}
          validate={validatePasswordMatch(newPassword)}
          required
          disabled={isSubmitting}
          error={isPasswordMismatch}
          helperText={isPasswordMismatch ? t("changePassword.passwordMatchError") : ""}
          startAdornment={<LockOutlinedIcon sx={iconSx} />}
        />
      </div>

      {/* Сообщения об ошибках */}
      {!isNotSameAsCurrent && newPassword.length > 0 && (
        <p className={style.passwordRule}>{t("changePassword.samePasswordError")}</p>
      )}

      {error && !formError && <p className={style.passwordRule}>{error}</p>}

      {formError && <p className={style.passwordRule}>{formError}</p>}

      <button
        type="submit"
        className={style.button}
        disabled={isSubmitting || !isFormValid}
      >
        {isSubmitting ? t("changePassword.submitting") : t("changePassword.button")}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
