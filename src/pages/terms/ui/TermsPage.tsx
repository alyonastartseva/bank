import styles from "../ui/TermsPage.module.css";
import { IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
const TermsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles.absolute}>
      <div className={styles.header}>
        <IconButton
          className={styles.backButton}
          onClick={() => navigate(-1)}
          sx={{ width: 42, height: 42, backgroundColor: "var(--color-item-bg)" }}
        >
          <ArrowBackIosNewOutlinedIcon
            className={styles.icon}
            sx={{ fill: "#1e1e2d", width: 18 }}
          />
        </IconButton>
        <h1 className={styles.title}>{t("terms.title")}</h1>
      </div>
      <div className={styles.terms}>
        <div className={styles.currentTerm}>{t("terms.firstRule")}</div>
        <div className={styles.currentTerm}>{t("terms.secondRule")}</div>
        <div className={styles.currentTerm}>{t("terms.thirdRule")}</div>
        <div className={styles.currentTerm}>{t("terms.fourthRule")}</div>
      </div>
    </div>
  );
};

export default TermsPage;
