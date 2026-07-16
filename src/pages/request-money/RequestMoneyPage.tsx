import { useNavigate } from "react-router-dom";
import styles from "./RequestMoneyPage.module.css";
import { useState } from "react";
import {
  type RequestMoneyData,
  RequestMoneyForm,
} from "@/features/request-money/ui/RequestMoneyForm.tsx";
import { useAppSelector } from "@/shared/hooks/hooksReducer.ts";

const RequestMoneyPage = () => {
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
      <RequestMoneyForm
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        initialData={initialData}
      />
    </div>
  );
};

export default RequestMoneyPage;
