import type { User } from "@/shared/types/typesReducer.ts";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooksReducer.ts";
import {
  addToken,
  addUser,
  initialUser,
} from "@/app/store/slices/bankSlice.ts";
import { Link, useNavigate } from "react-router-dom";
import style from "./SignUpForm.module.css";
import { emailRegex, nameRegex, phoneRegex } from "@/shared/lib/validation/rules.ts";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { EmailInput, PasswordInput, RequiredTextInput } from "@/shared/ui/Input/presets";
import {
  validatePassword,
  validateRequired,
  validateEmail, validateName, validatePhone,
} from "@/shared/ui/Input/validators";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

interface SignUpFormProps {
  login: User;
  addLoginInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpForm = ({ login, addLoginInfo }: SignUpFormProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.bank.user);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Валидация полей через существующие валидаторы
  const passwordValidation = validatePassword(password);
  const isPasswordValid = passwordValidation.isValid;
  const passwordError = passwordValidation.errorText;

  const emailValidation = validateEmail(email);
  const isEmailValid = emailValidation.isValid;
  const emailError = emailValidation.errorText;

  const nameValidation = validateRequired(fullName);
  const isNameValid = nameValidation.isValid;

  const phoneValidation = validateRequired(phone);
  const isPhoneValid = phoneValidation.isValid;

  // Проверка, что все поля заполнены и валидны
  const isFormValid = isNameValid &&
    isPhoneValid &&
    isEmailValid &&
    isPasswordValid;

  const addUsers = async () => {
    setFormError("");

    if (!isFormValid) {
      setFormError("Пожалуйста заполните все поля корректно");
      return;
    }

    setIsSubmitting(true);

    try {
      const userArr = JSON.stringify(user);
      const loginArr = JSON.stringify(login);
      const initialUserArr = JSON.stringify(initialUser);

      if (userArr !== loginArr && loginArr !== initialUserArr) {
        // Имитация асинхронного запроса
        await new Promise((resolve) => setTimeout(resolve, 1000));

        dispatch(addUser(login));
        dispatch(addToken(Math.random().toString(36).substring(2)));
        navigate("/sign-in");
      } else {
        setFormError("Пользователь с такими данными уже существует");
      }
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      setFormError("Ошибка при регистрации. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleFieldChange = (name: string, value: string) => {
    const event = {
      target: {
        name,
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    addLoginInfo(event);
  };

  // Общие стили для иконок
  const iconSx = { fill: "#868686", width: 16 };
  const eyeIconSx = { fill: "#868686", width: 16, cursor: "pointer" };

  return (
    <form
      className={style.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() && isFormValid) {
          addUsers();
        }
      }}
      noValidate
    >
      {/* Полное имя */}
      <div className={style.field}>
        <RequiredTextInput
          id="fullName"
          name="fullName"
          value={fullName}
          label={t("fullName")}
          required
          pattern={nameRegex.source}
          maxLength={30}
          onChange={(value) => {
            setFullName(value);
            handleFieldChange("fullName", value);
          }}
          startAdornment={<PersonOutlinedIcon sx={iconSx} />}
          disabled={isSubmitting}
          placeholder={t("Иван Иванов")}
          validate={validateName}
          helperText={!isNameValid && fullName.length > 0 ? "Поле обязательно для заполнения" : ""}
        />
      </div>

      {/* Телефон */}
      <div className={style.field}>
        <RequiredTextInput
          id="phone"
          name="phone"
          value={phone}
          label={t("phoneNumber")}
          required
          pattern={phoneRegex.source}
          onChange={(value) => {
            const cleanValue = value.replace(/\D/g, "");
            setPhone(cleanValue);
            handleFieldChange("phoneNumber", cleanValue);
          }}
          startAdornment={<PhoneOutlinedIcon sx={iconSx} />}
          disabled={isSubmitting}
          placeholder="88005553535"
          validate={validatePhone}
          error={!isPhoneValid && phone.length > 0}
          helperText={!isPhoneValid && phone.length > 0 ? "Поле обязательно для заполнения" : ""}
        />
      </div>

      {/* Email */}
      <div className={style.field}>
        <EmailInput
          id="email"
          name="email"
          value={email}
          label={t("email")}
          required
          pattern={emailRegex.source}
          onChange={(value) => {
            setEmail(value);
            handleFieldChange("email", value);
          }}
          maxLength={30}
          startAdornment={<EmailOutlinedIcon sx={iconSx} />}
          validate={validateEmail}
          disabled={isSubmitting}
          error={!isEmailValid && email.length > 0}
          helperText={!isEmailValid && email.length > 0 ? emailError : ""}
        />
      </div>

      {/* Пароль */}
      <div className={style.field}>
        <PasswordInput
          id="password"
          name="password"
          value={password}
          label={t("password")}
          type={passwordVisible ? "text" : "password"}
          required
          minLength={6}
          maxLength={20}
          disabled={isSubmitting}
          onChange={(value) => {
            setPassword(value);
            const event = {
              target: {
                name: "password",
                value: value,
              },
            } as React.ChangeEvent<HTMLInputElement>;
            addLoginInfo(event);
          }}
          startAdornment={<LockOutlinedIcon sx={iconSx} />}
          endAdornment={
            passwordVisible ? (
              <VisibilityOffOutlinedIcon
                sx={eyeIconSx}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <VisibilityOutlinedIcon
                sx={eyeIconSx}
                onClick={togglePasswordVisibility}
              />
            )
          }
          error={!isPasswordValid && password.length > 0}
          helperText={!isPasswordValid && password.length > 0 ? passwordError : t("changePassword.passwordRequirements")}
        />
      </div>

      {/* Сообщение об ошибке */}
      {formError && (
        <p className={style.errorMessage}>{formError}</p>
      )}

      <button
        type="submit"
        className={style.button}
        disabled={isSubmitting || !isFormValid}
      >
        {isSubmitting ? t("signUpSubmitting") : t("signUp")}
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
