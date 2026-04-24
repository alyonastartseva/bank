import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { CardFormData } from "./types";
import {
  validateCardNumber,
  validateExpiryDate,
  validateCardholderName,
  validateCVV,
} from "./validation";
import { formatCardNumber, formatExpiryDate, formatCVV } from "@/shared/lib/validation/formatters";

export const useCardForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CardFormData>({
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    cardNumber: "",
  });
  const [errors, setErrors] = useState<Partial<CardFormData>>({});

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
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CardFormData> = {};
    if (!validateCardholderName(formData.cardholderName)) {
      newErrors.cardholderName = t("addNewCard.error.cardholderName");
    }
    if (!validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = t("addNewCard.error.expiryDate");
    }
    if (!validateCVV(formData.cvv)) {
      newErrors.cvv = t("addNewCard.error.cvv");
    }
    const rawCardNumber = formData.cardNumber.replace(/\s/g, "");
    if (!validateCardNumber(rawCardNumber)) {
      newErrors.cardNumber = t("addNewCard.error.cardNumber");
    }
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