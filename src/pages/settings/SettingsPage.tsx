import { Link } from "react-router-dom";
import { useTheme } from "@/shared/hooks/useTheme";
import styles from "./SettingsPage.module.css";
import { useTranslation } from "react-i18next";
import { useTheme as useMuiTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { LanguageModal, useChangeLanguage } from "@/features/change-language";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/entities/settings/api/settings-api.ts";
import type { UpdateUserSettings } from "@/entities/settings/model/types.ts";
import type { LanguageCode } from "@/shared/config/languages.ts";

const IconCircle = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.iconCircle}>{children}</div>
);

const iconSx = {
  fontSize: 25,
  color: "var(--color-icon-muted)",
};

const SettingsPage = () => {
  const { t } = useTranslation();

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const { currentLanguageLabel } = useChangeLanguage();

  const [updateSettings] = useUpdateSettingsMutation();

  // Временная заглушка ID пока нет регистрации
  const userId = 1;

  const { data: settings } = useGetSettingsQuery(userId);

  const { theme, toggleTheme } = useTheme();

  const muiTheme = useMuiTheme();
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up("lg"));

  const updateUserSettings = async (changes: Partial<UpdateUserSettings>) => {
    if (!settings) return;

    try {
      return await updateSettings({
        userId,
        data: {
          notificationEnabled:
            changes.notificationEnabled ?? settings.notificationEnabled,

          language: changes.language ?? settings.language,

          darkModeEnabled: changes.darkModeEnabled ?? settings.darkModeEnabled,
        },
      }).unwrap();
    } catch (error) {
      console.error("Failed to update settings:", error);
      throw error;
    }
  };

  const handleThemeChange = async () => {
    const nextDarkMode = theme !== "dark";

    toggleTheme();

    await updateUserSettings({
      darkModeEnabled: nextDarkMode,
    });
  };

  const handleLanguageChange = async (lang: LanguageCode) => {
    await updateUserSettings({
      language: lang.toUpperCase() as UpdateUserSettings["language"],
    });
  };

  return (
    <div className={`${styles.container} ${isDesktop ? styles.desktop : ""}`}>
      <div className={styles.wrapper}>
        <section className={styles.block}>
          <p className={styles.sectionTitle}>{t("settings.general")}</p>

          <button
            type="button"
            onClick={() => setIsLanguageModalOpen(true)}
            className={`${styles.row} ${styles.rowButton} ${isDesktop ? styles.rowDesktop : ""}`}
          >
            {isDesktop && (
              <IconCircle>
                <LanguageOutlinedIcon sx={iconSx} />
              </IconCircle>
            )}
            <span className={isDesktop ? styles.rowTitle : ""}>
              {t("settings.language")}
            </span>
            <span className={styles.value}>{currentLanguageLabel}</span>
          </button>

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
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={handleThemeChange}
              />
              <span className={styles.slider} />
            </label>
          </div>
        </section>
      </div>
      <LanguageModal
        open={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
};

export default SettingsPage;
