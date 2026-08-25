import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { CardFormData } from "./types";
import {
  validateCardNumber,
  validateExpiryDate,
  validateCardholderName,
  validateCVV,
} from "./validation";
import {
  formatCardNumber,
  formatExpiryDate,
  formatCVV,
} from "@/shared/lib/validation/formatters";

export const useCardForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CardFormData>({
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    cardNumber: "",
  });
  const [errors, setErrors] = useState<Partial<CardFormData>>({});

  const validateField = (field: keyof CardFormData, value: string): string => {
    switch (field) {
      case "cardholderName":
        return validateCardholderName(value) ? "" : t("addNewCard.error.cardholderName");
      case "expiryDate":
        return validateExpiryDate(value) ? "" : t("addNewCard.error.expiryDate");
      case "cvv":
        return validateCVV(value) ? "" : t("addNewCard.error.cvv");
      case "cardNumber": {
        const raw = value.replace(/\s/g, "");
        return validateCardNumber(raw) ? "" : t("addNewCard.error.cardNumber");
      }
      default:
        return "";
    }
  };

  const handleChange = (field: keyof CardFormData, rawValue: string) => {
    let formattedValue = rawValue;
    switch (field) {
      case "cardNumber":
        formattedValue = formatCardNumber(rawValue);
        break;
      case "expiryDate":
        formattedValue = formatExpiryDate(rawValue);
        break;
      case "cvv":
        formattedValue = formatCVV(rawValue);
        break;
    }
    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    const error = validateField(field, formattedValue);
    setErrors((prev) => ({ ...prev, [field]: error || undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CardFormData> = {};
    (Object.keys(formData) as (keyof CardFormData)[]).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = (onSuccess?: (data: CardFormData) => void) => {
    if (validateForm()) {
      onSuccess?.(formData);
      return true;
    }
    return false;
  };

  return {
    formData,
    errors,
    handleChange,
    submitForm,
  };
};
