import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useTranslation } from "react-i18next";
import styles from "./RequestMoneyPage.module.css";
import { useState } from "react";
import {
  type RequestMoneyData,
  RequestMoneyForm,
} from "@/features/request-money/ui/RequestMoneyForm.tsx";
import { useAppSelector } from "@/shared/hooks/hooksReducer.ts";

const RequestMoneyPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.bank.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: RequestMoneyData) => {
    setIsSubmitting(true);
    try {
      console.log("Отправка запроса:", {
        ...data,
        payer: user?.fullName || data.payerName,
        email: user?.email || data.email,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Успех - редирект или уведомление
      navigate(-1);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const initialData = user
    ? {
        fullName: user.fullName || "",
        email: user.email || "",
        description: user.fullName || "",
        monthlyDueBy: [],
      }
    : undefined;

  return (
    <div className={styles.RequestMoneyPage}>
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
        <h1 className={styles.title}>{t("requestMoney.title")}</h1>
        <div className={styles.placeholder} />
      </div>

      <RequestMoneyForm
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        initialData={initialData}
      />
    </div>
  );
};

export default RequestMoneyPage;
