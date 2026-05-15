import { useTranslation } from "react-i18next";
import { useCardForm } from "../model/useCardForm";
import userIcon from "@/shared/icons/user.svg";
import cardIcon from "@/shared/icons/card.svg";
import mastercardIcon from "@/shared/icons/mastercard.svg";
import plusIcon from "@/shared/icons/plus.svg";
import styles from "./AddCardForm.module.css";

export const AddCardForm = () => {
  const { t } = useTranslation();
  const { formData, errors, handleChange, submitForm } = useCardForm();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm((data) => {
      console.log("Card data:", data);
      alert(t("addNewCard.cardAdded"));
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {/* Cardholder Name */}
      <div className={styles.field}>
        <label className={styles.label}>{t("addNewCard.cardholderName")}</label>
        <div
          className={`${styles.inputWrapper} ${errors.cardholderName ? styles.errorWrapper : ""}`}
        >
          <img src={userIcon} alt="" className={styles.inputIcon} />
          <input
            type="text"
            className={styles.input}
            value={formData.cardholderName}
            onChange={(e) => handleChange("cardholderName", e.target.value)}
            placeholder={t("addNewCard.cardholderNamePlaceholder")}
            required
          />
        </div>
        {errors.cardholderName && (
          <span className={styles.errorMsg}>{errors.cardholderName}</span>
        )}
      </div>

      {/* Row: Expiry Date + CVV */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>{t("addNewCard.expiryDate")}</label>
          <div
            className={`${styles.inputWrapper} ${errors.expiryDate ? styles.errorWrapper : ""}`}
          >
            <input
              type="text"
              className={styles.input}
              value={formData.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>
          {errors.expiryDate && (
            <span className={styles.errorMsg}>{errors.expiryDate}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>{t("addNewCard.CVV")}</label>
          <div
            className={`${styles.inputWrapper} ${errors.cvv ? styles.errorWrapper : ""}`}
          >
            <input
              type="text"
              className={styles.input}
              value={formData.cvv}
              onChange={(e) => handleChange("cvv", e.target.value)}
              placeholder="1234"
              maxLength={4}
              required
            />
          </div>
          {errors.cvv && <span className={styles.errorMsg}>{errors.cvv}</span>}
        </div>
      </div>

      {/* Card Number */}
      <div className={styles.field}>
        <label className={styles.label}>{t("addNewCard.cardNumber")}</label>
        <div
          className={`${styles.inputWrapper} ${errors.cardNumber ? styles.errorWrapper : ""}`}
        >
          <img src={cardIcon} alt="" className={styles.inputIcon} />
          <input
            type="text"
            className={styles.input}
            value={formData.cardNumber}
            onChange={(e) => handleChange("cardNumber", e.target.value)}
            placeholder="4562 1122 4595 7852"
            maxLength={19}
            required
          />
          <img src={mastercardIcon} alt="mastercard" className={styles.rightIcon} />
        </div>
        {errors.cardNumber && (
          <span className={styles.errorMsg}>{errors.cardNumber}</span>
        )}
      </div>

      <button type="submit" className={styles.button}>
        {t("addNewCard.addButton")}
        <img src={plusIcon} alt="" className={styles.buttonIcon} />
      </button>
    </form>
  );
};
