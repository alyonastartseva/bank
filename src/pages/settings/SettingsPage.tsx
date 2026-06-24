import { Link } from "react-router-dom";
import { useTheme } from "@/shared/hooks/useTheme";
import styles from "./SettingsPage.module.css";
import { useTranslation } from "react-i18next";
import { useTheme as useMuiTheme, useMediaQuery, Box } from "@mui/material";

import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const IconCircle = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      width: 42,
      height: 42,
      borderRadius: "50%",
      bgcolor: "var(--color-item-bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {children}
  </Box>
);

const iconSx = {
  fontSize: 25,
  color: "var(--color-icon-muted)",
};

const SettingsPage = () => {
  const { t } = useTranslation();

  const handleLanguageClick = () => {
    console.log("Language clicked");
  };
  const { theme, toggleTheme } = useTheme();

  const muiTheme = useMuiTheme();
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up("lg"));

  return (
    <div className={`${styles.container} ${isDesktop ? styles.desktop : ""}`}>
      <div className={styles.wrapper}>
        <section className={styles.block}>
          <p className={styles.sectionTitle}>{t("settings.general")}</p>

          <Link
            to="#"
            onClick={handleLanguageClick}
            className={`${styles.row} ${isDesktop ? styles.rowDesktop : ""}`}
          >
            {isDesktop && (
              <IconCircle>
                <LanguageOutlinedIcon sx={iconSx} />
              </IconCircle>
            )}
            <span className={isDesktop ? styles.rowTitle : ""}>
              {t("settings.language")}
            </span>
            <span className={styles.value}>English</span>
          </Link>

          <Link
            to="/profile"
            className={`${styles.row} ${isDesktop ? styles.rowDesktop : ""}`}
          >
            {isDesktop && (
              <IconCircle>
                <PersonOutlinedIcon sx={iconSx} />
              </IconCircle>
            )}
            <span className={isDesktop ? styles.rowTitle : ""}>
              {t("settings.myProfile")}
            </span>
          </Link>

          <Link
            to="/contact-us"
            className={`${styles.row} ${isDesktop ? styles.rowDesktop : ""}`}
          >
            {isDesktop && (
              <IconCircle>
                <MailOutlinedIcon sx={iconSx} />
              </IconCircle>
            )}
            <span className={isDesktop ? styles.rowTitle : ""}>
              {t("settings.contactUs")}
            </span>
          </Link>
        </section>

        <section className={styles.block}>
          <p className={styles.sectionTitle}>{t("settings.security")}</p>

          <Link
            to="/change-password"
            className={`${styles.row} ${isDesktop ? styles.rowDesktop : ""}`}
          >
            {isDesktop && (
              <IconCircle>
                <ShieldOutlinedIcon sx={iconSx} />
              </IconCircle>
            )}
            <span className={isDesktop ? styles.rowTitle : ""}>
              {t("settings.changePassword")}
            </span>
          </Link>

          <Link
            to="/privacy-policy"
            className={`${styles.row} ${isDesktop ? styles.rowDesktop : ""}`}
          >
            {isDesktop && (
              <IconCircle>
                <LockOutlinedIcon sx={iconSx} />
              </IconCircle>
            )}
            <span className={isDesktop ? styles.rowTitle : ""}>
              {t("settings.privacyPolicy")}
            </span>
          </Link>
        </section>

        <section className={styles.block}>
          <p
            className={`${styles.helperText} ${isDesktop ? styles.helperTextDesktop : ""}`}
          >
            {t("settings.chooseData")}
          </p>

          <div className={`${styles.row} ${isDesktop ? styles.rowDesktop : ""}`}>
            {isDesktop && (
              <IconCircle>
                <FingerprintOutlinedIcon sx={iconSx} />
              </IconCircle>
            )}
            <span className={isDesktop ? styles.rowTitle : ""}>
              {t("settings.biometric")}
            </span>
            <label className={styles.switch}>
              <input type="checkbox" />
              <span className={styles.slider} />
            </label>
          </div>
          <div className={`${styles.row} ${isDesktop ? styles.rowDesktop : ""}`}>
            {isDesktop && (
              <IconCircle>
                <DarkModeOutlinedIcon sx={iconSx} />
              </IconCircle>
            )}
            <span className={isDesktop ? styles.rowTitle : ""}>
              {t("settings.theme")}
            </span>
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
