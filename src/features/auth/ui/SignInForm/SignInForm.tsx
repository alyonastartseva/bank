import { Link } from "react-router-dom";
import type { User } from "@/shared/types/typesReducer.ts";
import style from "./SignInForm.module.css";
import { useState } from "react";
import useAuth from "@/shared/hooks/useAuth.ts";
import { useTranslation } from "react-i18next";
import { EmailInput, PasswordInput } from "@/shared/ui/Input/presets";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { validateRequired } from "@/shared/ui/Input/validators";

interface SignInFormProps {
  login: User;
  addLoginInfo: (value: string, type: string) => void;
}

const SignInForm = ({ login, addLoginInfo }: SignInFormProps) => {
  const { signIn } = useAuth(login);
  const { t } = useTranslation();
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  function onChangeEmail(value: string) {
    setEmail(value);
    addLoginInfo(value, "email");
  }

  function onChangePassword(value: string) {
    setPassword(value);
    addLoginInfo(value, "password");
  }

  const iconSx = { fill: "#868686", width: 16 };
  const eyeIconSx = { fill: "#868686", width: 16, cursor: "pointer" };

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
      <EmailInput
        label={t("email")}
        value={email}
        onChange={onChangeEmail}
        startAdornment={<EmailOutlinedIcon sx={iconSx} />}
        required
      />

      <PasswordInput
        label={t("password")}
        value={password}
        type={passwordVisible ? "text" : "password"}
        validate={validateRequired}
        onChange={onChangePassword}
        startAdornment={<LockOutlinedIcon sx={iconSx} />}
        endAdornment={
          passwordVisible ? (
            <VisibilityOffOutlinedIcon
              sx={eyeIconSx}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          ) : (
            <VisibilityOutlinedIcon
              sx={eyeIconSx}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          )
        }
        required
      />

      <button type="submit" className={style.button}>
        {t("signIn")}
      </button>
      <p className={style.regLink}>
        {t("iAmNewUser")}{" "}
        <Link className={style.link} to="/sign-up">
          {t("signUp")}
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
