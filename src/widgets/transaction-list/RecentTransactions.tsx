import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/hooks/hooksReducer";
import TransactionItem from "@/shared/ui/transactionItem/TransactionItem";
import type { Transaction } from "@/shared/types/typesReducer";
import styles from "./RecentTransactions.module.css";
import { useTheme, useMediaQuery } from "@mui/material";

interface RecentTransactionsProps {
  limit?: number;
}

export const RecentTransactions = ({ limit = 3 }: RecentTransactionsProps) => {
  const { t } = useTranslation();
  const allTransactions = useAppSelector((state) => state.bank.transactions);
  const transactions = allTransactions.slice(0, limit);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  if (transactions.length === 0) {
    return <div className={styles.empty}>{t("transaction.empty")}</div>;
  }

  return (
    <div className={`${styles.container} ${isDesktop ? styles.desktop : ""}`}>
      {isDesktop && (
        <div className={styles.headerWrapper}>
          <p className={styles.titleDesktop}>{t("recentTransactions.title")}</p>
          <button className={styles.viewAllButton}>
            {t("recentTransactions.viewAll")}
          </button>
        </div>
      )}
      {transactions.map((transaction: Transaction) => (
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
