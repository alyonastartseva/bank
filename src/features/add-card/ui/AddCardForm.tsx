import { useTranslation } from "react-i18next";
import plusIcon from "@/shared/icons/plus.svg";
import styles from "./AddCardForm.module.css";
import type { CardFormData } from "../model/types";
import {
  CardNumberInput,
  ExpiryInput,
  RequiredTextInput,
} from "@/shared/ui/Input/presets";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { validateName } from "@/shared/ui/Input/validators.ts";
import { validateCVV, validateExpiryDate } from "@/features/add-card/model/validation.ts";
import { PaymentOutlined } from "@mui/icons-material";
import { CvvInput } from "@/shared/ui/Input/presets/CvvInput.tsx";

type Props = {
  formData: CardFormData;
  errors: Partial<CardFormData>;
  handleChange: (field: keyof CardFormData, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  hideButton?: boolean;
};

export const AddCardForm = ({
  formData,
  errors,
  handleChange,
  onSubmit,
  hideButton,
}: Props) => {
  const { t } = useTranslation();

  const iconSx = { fill: "#A2A2A7", width: 22 };

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {/* Cardholder Name */}
      <div className={styles.field}>
        <RequiredTextInput
          id="cardholderName"
          name="cardholderName"
          label={t("addNewCard.cardholderName")}
          value={formData.cardholderName}
          onChange={(e) => handleChange("cardholderName", e)}
          placeholder={t("addNewCard.cardholderNamePlaceholder")}
          startAdornment={<AccountCircleOutlinedIcon sx={iconSx} />}
          validate={validateName}
          error={!!errors.cardholderName}
          helperText={errors.cardholderName || ""}
          required
        />
      </div>

      {/* Row: Expiry Date + CVV */}
      <div className={styles.row}>
        <div className={styles.field}>
          <ExpiryInput
            id="expiryDate"
            name="expiryDate"
            label={t("addNewCard.expiryDate")}
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={(e) => handleChange("expiryDate", e)}
            validate={validateExpiryDate}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate || ""}
          />
        </div>

        <div className={styles.field}>
          <CvvInput
            id="cvv"
            name="cvv"
            label={t("addNewCard.CVV")}
            placeholder="1234"
            value={formData.cvv}
            onChange={(e) => handleChange("cvv", e)}
            validate={validateCVV}
            error={!!errors.cvv}
            helperText={errors.cvv || ""}
          />
        </div>
      </div>

      {/* Card Number */}
      <div className={styles.field}>
        <CardNumberInput
          id="cardNumber"
          name="cardNumber"
          label={t("addNewCard.cardNumber")}
          value={formData.cardNumber}
          onChange={(e) => handleChange("cardNumber", e)}
          startAdornment={<PaymentOutlined sx={iconSx} />}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber || ""}
        />
      </div>

      {!hideButton && (
        <button type="submit" className={styles.button}>
          {t("addNewCard.addButton")}
          <img src={plusIcon} alt="" className={styles.buttonIcon} />
        </button>
      )}
    </form>
  );
};
