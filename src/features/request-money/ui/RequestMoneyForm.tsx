import styles from "./RequestMoneyForm.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { EmailInput, RequiredTextInput } from "@/shared/ui/Input/presets";
import {
  validateDate,
  validateEmail,
  validateName,
  validateRequired,
} from "@/shared/ui/Input/validators.ts";
import { DateInput } from "@/shared/ui/Input/presets/DateInput.tsx";
import { emailRegex } from "@/shared/lib/validation/rules.ts";
import { Box } from "@mui/material";

export interface RequestMoneyData {
  amount: string;
  payerName: string;
  email: string;
  description: string;
  monthlyDueBy: string;
}

interface RequestMoneyFormProps {
  onSubmit: (data: RequestMoneyData) => void;
  isLoading?: boolean;
  initialData?: {
    fullName: string;
    email: string;
    description?: string;
    monthlyDueBy?: string[];
  };
}

export const RequestMoneyForm = ({
  onSubmit,
  isLoading = false,
  initialData,
}: RequestMoneyFormProps) => {
  const { t } = useTranslation();

  const [payerName, setPayerName] = useState<string>(initialData?.fullName || "");
  const [email, setEmail] = useState<string>(initialData?.email || "");
  const [description, setDescription] = useState<string>(initialData?.description || "");
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const iconSx = { fill: "#A2A2A7", width: 22 };

  // Собираем дату для валидации
  const monthlyDueBy = `${day}${month}${year}`;

  // Валидация полей
  const isPayerNameValid = validateName(payerName).isValid;
  const isEmailValid = validateEmail(email).isValid;
  const isDescriptionValid = validateRequired(description).isValid;
  const dateValidation = validateDate(monthlyDueBy);
  const isMonthlyDueByValid = dateValidation.isValid;
  const dateErrorText = dateValidation.errorText;
  const isAmountValid = amount && parseFloat(amount) > 0;

  const isFormValid =
    isPayerNameValid &&
    isEmailValid &&
    isDescriptionValid &&
    isMonthlyDueByValid &&
    isAmountValid;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (!isFormValid) {
      setFormError(t("requestMoney.fillAllFields"));
      return;
    }

    onSubmit({
      amount,
      payerName,
      email,
      description,
      monthlyDueBy,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <RequiredTextInput
          id="payerName"
          name="payerName"
          label={t("requestMoney.payerName")}
          value={payerName}
          onChange={setPayerName}
          startAdornment={<AccountCircleOutlinedIcon sx={iconSx} />}
          required
          validate={validateName}
          placeholder={t("addNewCard.cardholderNamePlaceholder")}
          error={!!payerName && !isPayerNameValid}
          helperText={
            !!payerName && !isPayerNameValid ? t("requestMoney.invalidName") : ""
          }
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <EmailInput
          id="email"
          name="email"
          value={email}
          label={t("requestMoney.emailAddress")}
          required
          validate={validateEmail}
          pattern={emailRegex.source}
          onChange={(value) => {
            setEmail(value);
          }}
          maxLength={30}
          startAdornment={<EmailOutlinedIcon sx={iconSx} />}
          error={!isEmailValid && email.length > 0}
          helperText={!isEmailValid && email.length > 0}
        />
      </div>

      <div className={styles.field}>
        <RequiredTextInput
          id="description"
          name="description"
          label={t("requestMoney.description")}
          value={description}
          onChange={setDescription}
          startAdornment={<AccountCircleOutlinedIcon sx={iconSx} />}
          required
          placeholder={t("Введите описание")}
          error={!!description && !isDescriptionValid}
          helperText={
            !!description && !isDescriptionValid
              ? t("requestMoney.invalidDescription")
              : ""
          }
          disabled={isLoading}
        />
      </div>

      <div className={styles.field}>
        <div className={styles.dateLabelWrapper}>
          <span className={styles.dateLabel}>{t("requestMoney.monthlyDueBy")}</span>
        </div>
        <div className={styles.dateFields}>
          <DateInput
            id="monthlyDueByDay"
            name="monthlyDueByDay"
            value={day}
            onChange={setDay}
            placeholder="DD"
            maxLength={2}
            inputMode="numeric"
            className={styles.datePart}
            disabled={isLoading}
          />
          <span className={styles.dateSpacer}> </span>
          <DateInput
            id="monthlyDueByMonth"
            name="monthlyDueByMonth"
            value={month}
            onChange={setMonth}
            placeholder="MM"
            maxLength={2}
            inputMode="numeric"
            className={styles.datePart}
            disabled={isLoading}
          />
          <span className={styles.dateSpacer}> </span>
          <DateInput
            id="monthlyDueByYear"
            name="monthlyDueByYear"
            value={year}
            onChange={setYear}
            placeholder="YYYY"
            maxLength={4}
            inputMode="numeric"
            className={styles.datePart}
            disabled={isLoading}
          />
        </div>
        {day.length > 0 &&
          month.length > 0 &&
          year.length > 0 &&
          !isMonthlyDueByValid && <p className={styles.dateError}>{dateErrorText}</p>}
      </div>

      <Box className={styles.amountCard}>
        <div className={styles.amountHeader}>
          <span className={styles.amountLabel}>{t("requestMoney.enterAmount")}</span>
          <button type="button" className={styles.changeCurrency}>
            {t("requestMoney.changeCurrency")}
          </button>
        </div>
        <div className={styles.amountRow}>
          <span className={styles.currencySymbol}>USD</span>
          <input
            type="text"
            className={styles.amountValue}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="26.00.00"
          />
        </div>
      </Box>

      {formError && <p className={styles.errorMessage}>{formError}</p>}

      <button
        type="submit"
        className={styles.sendButton}
        disabled={isLoading || !isFormValid}
      >
        {isLoading ? t("requestMoney.submitting") : t("requestMoney.sendMoney")}
      </button>
    </form>
  );
};
