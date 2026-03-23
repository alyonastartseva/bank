import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/shared/hooks/useTheme";
import styles from "./SettingsPage.module.css";

import goBackIcon from "@/shared/icons/go-back.svg";
import logoutIcon from "@/shared/icons/out.svg";
import { useTranslation } from "react-i18next";

const SettingsPage = () => {
  const { t } = useTranslation();

  const handleLanguageClick = () => {
    console.log("Language clicked");
  };
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.iconButton} onClick={() => navigate(-1)}>
          <img src={goBackIcon} className={styles.icon} />
        </button>
        <h1 className={styles.title}>{t("settings.title")}</h1>
        <button className={styles.iconButton}>
          <img src={logoutIcon} className={styles.icon} />
        </button>
      </header>

      <div className={styles.wrapper}>
        <section className={styles.block}>
          <p className={styles.sectionTitle}>{t("settings.general")}</p>

          <Link to="#" onClick={handleLanguageClick} className={styles.row}>
            <span>{t("settings.language")}</span>
            <span className={styles.value}>English</span>
          </Link>

          <Link to="/profile" className={styles.row}>
            <span>{t("settings.myProfile")}</span>
          </Link>

          <Link to="/contact-us" className={styles.row}>
            <span>{t("settings.contactUs")}</span>
          </Link>
        </section>

        <section className={styles.block}>
          <p className={styles.sectionTitle}>{t("settings.security")}</p>

          <Link to="/change-password" className={styles.row}>
            <span>{t("settings.changePassword")}</span>
          </Link>

          <Link to="/privacy-policy" className={styles.row}>
            <span>{t("settings.privacyPolicy")}</span>
          </Link>

          <p className={styles.helperText}>{t("settings.chooseData")}</p>

          <div className={styles.row}>
            <span>{t("settings.biometric")}</span>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider} />
            </label>
          </div>
          <div className={styles.row}>
            <span>{t("settings.theme")}</span>
            <label className={styles.switch}>
              <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
              <span className={styles.slider} />
            </label>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
