import { useNavigate } from "react-router-dom";
import sendIcon from "@/shared/icons/send.svg";
import receiveIcon from "@/shared/icons/receive.svg";
import loanIcon from "@/shared/icons/loan.svg";
import topupIcon from "@/shared/icons/topup.svg";
import styles from "./ActionButtons.module.css";

const actions = [
  { label: "Send", icon: sendIcon, path: "/send-money" },
  { label: "Receive", icon: receiveIcon, path: "/request-money" },
  { label: "Loan", icon: loanIcon, path: "/loan" },
  { label: "Topup", icon: topupIcon, path: "/topup" },
];

export const ActionButtons = () => {
  const navigate = useNavigate();

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
