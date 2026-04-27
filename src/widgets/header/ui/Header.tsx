import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Header.module.css";
import goBackIcon from "@/shared/icons/go-back.svg";
import { headerConfig } from "./constants.ts";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const config = headerConfig[location.pathname] || {
    titleKey: "common.title",
    rightIcon: null,
  };

  const handleRightClick = () => {
    if (config.rightAction) config.rightAction();
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.iconButton} onClick={() => navigate(-1)}>
          <img src={goBackIcon} className={styles.icon} alt="back" />
        </button>
      </div>
      <h1 className={styles.title}>{t(config.titleKey)}</h1>
      <div className={styles.right}>
        {config.rightIcon && (
          <button className={styles.iconButton} onClick={handleRightClick}>
            <img src={config.rightIcon} className={styles.icon} alt="action" />
          </button>
        )}
      </div>
    </header>
  );
}
