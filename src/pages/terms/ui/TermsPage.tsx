import styles from "../ui/TermsPage.module.css";
import { useTranslation } from "react-i18next";
const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.absolute}>
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
