import { Box, Button, Typography } from "@mui/material";
import TransactionItem from "../../shared/ui/transactionItem/TransactionItem";
import { useGetTransactionsQuery } from "@/entities/transaction/api/transaction.api";
import { mapTransaction } from "@/entities/transaction/lib/mapTransaction";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../shared/config/routes";
import styles from "./TransactionLatest.module.css";

const TRANSACTION_LIMIT = 5;

export const TransactionLatest = () => {
  const { data, isLoading, isError } = useGetTransactionsQuery({
    page: 0,
    size: TRANSACTION_LIMIT,
  });
  const { t } = useTranslation();
  const transactions = data?.content.map(mapTransaction);
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <Typography className={styles.notification}>
        {t("transactionLatest.loading")}
      </Typography>
    );
  }

  if (!transactions?.length) {
    return (
      <Typography className={styles.notification}>
        {t("transactionLatest.empty")}
      </Typography>
    );
  }

  if (isError) {
    return (
      <Typography className={styles.notification}>
        {t("transactionLatest.errorMessage")}
      </Typography>
    );
  }

  return (
    <Box component="section" className={styles.container}>
      <Box component="div" className={styles.titleContainer}>
        <Typography className={styles.title}>{t("transactionLatest.title")}</Typography>
        <Button onClick={() => navigate(AppRoutes.TRANSACTION_HISTORY)}>
          {t("transactionLatest.seeAll")}
        </Button>
      </Box>
      <Box className={styles.transitionsContainer}>
        {transactions?.map((transaction) => (
          <TransactionItem
            onClick={() => navigate("/transaction")}
            key={transaction.id}
            icon={transaction.icon}
            name={transaction.name}
            category={transaction.category}
            price={transaction.price}
          />
        ))}
      </Box>
    </Box>
  );
};
