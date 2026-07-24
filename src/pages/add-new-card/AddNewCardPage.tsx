import { Alert, Box, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardComponent from "@/widgets/card/CardComponent";
import { AddCardForm, useCardForm } from "@/features/add-card";
import { cardMock } from "@/widgets/card/cardMock";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import styles from "./AddNewCardPage.module.css";
import { useCreateAccountMutation } from "@/entities/account/api/account-api";
import React, { useState } from "react";

const USER_ID = "13445d6b-e829-4c1b-9973-70cf49c6c985";

const AddNewCardPage = () => {
  const { formData, errors, handleChange, submitForm } = useCardForm();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const getAccountTypeFromCardNumber = (
    cardNumber: string
  ): "CHECKING" | "SAVINGS" | "DEPOSIT" | "CREDIT" => {
    const firstDigit = cardNumber.replace(/\s/g, "")[0];
    const typeMap: Record<string, "CHECKING" | "SAVINGS" | "DEPOSIT" | "CREDIT"> = {
      "4": "CHECKING",
      "5": "SAVINGS",
      "6": "DEPOSIT",
      "3": "CREDIT",
    };
    return typeMap[firstDigit] || "CHECKING";
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    submitForm(async (data) => {
      console.log("Card data:", data);

      // TODO поменять на реального пользователя
      try {
        const accountData = {
          userId: USER_ID,
          initialBalance: 1000,
          currency: "RUB" as const,
          accountType: getAccountTypeFromCardNumber(data.cardNumber),
        };

        console.log("Creating account with userId:", USER_ID);
        const result = await createAccount(accountData).unwrap();

        const accountId = result.externalId || result.id || String(result.accountId);

        localStorage.setItem("lastAccountId", accountId);

        console.log("Account created:", result);

        setSnackbar({
          open: true,
          message: `Счет успешно создан! ID: ${accountId}`,
          severity: "success",
        });

        setTimeout(() => {
          navigate(`/statistics?accountId=${accountId}`);
        }, 1500);
      } catch (error) {
        console.error("Failed to create account:", error);

        let errorMessage = t("errors.createAccountFailed") || "Ошибка при создании счета";

        if (error && typeof error === "object") {
          const err = error as {
            data?: { message?: string; error?: string };
            message?: string;
            status?: number;
          };

          if (err.data?.message) {
            errorMessage = err.data.message;
          } else if (err.data?.error) {
            errorMessage = err.data.error;
          } else if (err.message) {
            errorMessage = err.message;
          }

          if (err.status === 409) {
            errorMessage = "У пользователя уже 5 счетов";
          } else if (err.status === 404) {
            errorMessage = "Пользователь не найден";
          }
        }

        setSnackbar({
          open: true,
          message: errorMessage,
          severity: "error",
        });
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box className={layoutStyles.page}>
        <Box className={layoutStyles.container}>
          <div className={styles.stack}>
            <div className={styles.cardWrapper}>
              <DecorativeEllipse round />
              <CardComponent card={cardMock} />
            </div>
            <AddCardForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              onSubmit={handleSubmit}
              hideButton={isDesktop || isLoading}
            />
          </div>
          {isDesktop && (
            <div className={styles.actions}>
              <button
                className={styles.cancelButton}
                onClick={() => navigate(-1)}
                disabled={isLoading}
              >
                {t("addNewCard.cancelButton")}
              </button>
              <button
                className={styles.submitButton}
                onClick={() => handleSubmit()}
                disabled={isLoading}
              >
                {isLoading ? t("common.loading") : t("addNewCard.addButton")}
              </button>
            </div>
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddNewCardPage;
