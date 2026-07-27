import type { User } from "@/shared/types/typesReducer.ts";
import { Link, useNavigate } from "react-router-dom";
import style from "./SignUpForm.module.css";
import { emailRegex, nameRegex, phoneRegex } from "@/shared/lib/validation/rules.ts";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { EmailInput, PasswordInput, RequiredTextInput } from "@/shared/ui/Input/presets";
import {
  validatePassword,
  validateEmail,
  validateName,
  validatePhone,
} from "@/shared/ui/Input/validators";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { useAppDispatch } from "@/shared/hooks/hooksReducer.ts";
import { addToken, addUser } from "@/app/store/slices/bankSlice.ts";

interface SignUpFormProps {
  login: User;
  addLoginInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpForm = ({ addLoginInfo }: SignUpFormProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");

  // Общее состояние для всех полей
  const [formData, setFormData] = useState<User>({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  // Один обработчик для всех полей
  const handleChange = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormError(""); // Сбрасываем ошибку при вводе

    const event = {
      target: { name: field, value },
    } as React.ChangeEvent<HTMLInputElement>;
    addLoginInfo(event);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.password
    ) {
      setFormError(t("validation.fillAllFields"));
      return;
    }

    dispatch(addUser(formData));
    dispatch(addToken(Math.random().toString(36).substring(2)));
    navigate("/sign-in");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const iconSx = { fill: "#868686", width: 16 };
  const eyeIconSx = { fill: "#868686", width: 16, cursor: "pointer" };

  return (
    <form className={style.form} onSubmit={handleSubmit} noValidate>
      {/* Сообщение об ошибке */}
      {formError && (
        <div className={style.formError}>
          <span className={style.errorIcon}>⚠</span>
          {formError}
        </div>
      )}

      <div className={style.field}>
        <RequiredTextInput
          id="fullName"
          name="fullName"
          value={formData.fullName}
          label={t("fullName")}
          required
          pattern={nameRegex.source}
          maxLength={30}
          onChange={(value) => handleChange("fullName", value)}
          startAdornment={<PersonOutlinedIcon sx={iconSx} />}
          placeholder={t("addNewCard.cardholderNamePlaceholder")}
          validate={validateName}
        />
      </div>

      <div className={style.field}>
        <RequiredTextInput
          id="phone"
          name="phone"
          value={formData.phoneNumber}
          label={t("phoneNumber")}
          required
          pattern={phoneRegex.source}
          maxLength={11}
          onChange={(value) => {
            const cleanValue = value.replace(/\D/g, "");
            handleChange("phoneNumber", cleanValue);
          }}
          startAdornment={<PhoneOutlinedIcon sx={iconSx} />}
          placeholder={t("88005553535")}
          validate={validatePhone}
        />
      </div>

      <div className={style.field}>
        <EmailInput
          id="email"
          name="email"
          value={formData.email}
          label={t("email")}
          required
          pattern={emailRegex.source}
          onChange={(value) => handleChange("email", value)}
          maxLength={30}
          startAdornment={<EmailOutlinedIcon sx={iconSx} />}
          validate={validateEmail}
        />
      </div>

      <div className={style.field}>
        <PasswordInput
          id="password"
          name="password"
          value={formData.password}
          label={t("password")}
          type={passwordVisible ? "text" : "password"}
          required
          minLength={6}
          maxLength={20}
          onChange={(value) => handleChange("password", value)}
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
          validate={validatePassword}
        />
      </div>

      <button type="submit" className={style.button}>
        {t("signUp")}
      </button>

      <p className={style.regLink}>
        {t("alreadyHaveAccount")}{" "}
        <Link className={style.link} to="/sign-in">
          {t("signIn")}
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
