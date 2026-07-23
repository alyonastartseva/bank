import { useNavigate } from "react-router-dom";
import sendIcon from "@/shared/icons/send.svg";
import receiveIcon from "@/shared/icons/receive.svg";
import loanIcon from "@/shared/icons/loan.svg";
import topupIcon from "@/shared/icons/topup.svg";
import styles from "./ActionButtons.module.css";
import { useTranslation } from "react-i18next";

const useActions = () => {
  const { t } = useTranslation();
  const actions = [
    { label: t("actions.send"), icon: sendIcon, path: "/send-money" },
    { label: t("actions.receive"), icon: receiveIcon, path: "/request-money" },
    { label: t("actions.loan"), icon: loanIcon, path: "/loan" },
    { label: t("actions.topup"), icon: topupIcon, path: "/topup" },
  ];
  return actions;
};

export const ActionButtons = () => {
  const navigate = useNavigate();
  const actions = useActions();

  return (
    <div className={styles.container}>
      {actions.map(({ label, icon, path }) => (
        <button
          key={label}
          className={styles.button}
          onClick={() => navigate(path)}
          aria-label={label}
        >
          <div className={styles.icon}>
            <img src={icon} alt={label} className={styles.iconImg} />
          </div>
          <span className={styles.label}>{label}</span>
        </button>
      ))}
    </div>
  );
};
