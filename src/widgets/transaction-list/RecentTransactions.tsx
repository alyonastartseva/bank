import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

import { useGetTransactionsQuery } from "@/entities/transaction/api/transaction.api";
import { mapTransaction } from "@/entities/transaction/lib/mapTransaction";
import TransactionItem from "@/shared/ui/transactionItem/TransactionItem";
import { AppRoutes } from "@/shared/config/routes";

import styles from "./RecentTransactions.module.css";

interface RecentTransactionsProps {
  limit?: number;
}

export const RecentTransactions = ({ limit = 3 }: RecentTransactionsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const {
    data: responseData,
    isLoading,
    error,
    refetch,
  } = useGetTransactionsQuery({
    page: 0,
    size: limit,
  });

  if (isLoading) {
    return (
      <div className={styles.empty}>
        {t("common.loading", {
          defaultValue: "Загрузка...",
        })}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.empty}>
        <p>
          {t("transaction.loadError", {
            defaultValue: "Не удалось загрузить транзакции",
          })}
        </p>

        <button type="button" onClick={() => refetch()}>
          {t("common.retry", {
            defaultValue: "Повторить",
          })}
        </button>
      </div>
    );
  }

  const transactions = responseData?.content.map(mapTransaction) ?? [];

  if (transactions.length === 0) {
    return <div className={styles.empty}>{t("transaction.empty")}</div>;
  }

  return (
    <div className={`${styles.container} ${isDesktop ? styles.desktop : ""}`}>
      {isDesktop && (
        <div className={styles.headerWrapper}>
          <p className={styles.titleDesktop}>{t("recentTransactions.title")}</p>

          <button
            type="button"
            className={styles.viewAllButton}
            onClick={() => navigate(AppRoutes.TRANSACTION_HISTORY)}
          >
            {t("recentTransactions.viewAll")}
          </button>
        </div>
      )}

      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          icon={transaction.icon}
          name={transaction.name}
          category={transaction.category}
          price={transaction.price}
        />
      ))}
    </div>
  );
};
