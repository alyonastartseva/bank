import { useTranslation } from "react-i18next";
import { useGetTransactionsQuery } from "@/entities/transaction/api/transaction.api";
import { mapTransaction } from "@/entities/transaction/lib/mapTransaction";
import { TransactionScroll } from "@/shared/ui/TransactionScroll/TransactionScroll";
import style from "./TransactionHistoryList.module.css";

export const TransactionHistoryList = () => {
  const { t } = useTranslation();

  const {
    data: responseData,
    isLoading,
    error,
  } = useGetTransactionsQuery({ page: 0, size: 20 });

  if (isLoading) {
    return <div className={style.list}>Загрузка истории транзакций...</div>;
  }

  if (error) {
    return <div className={style.list}>Не удалось загрузить транзакции</div>;
  }

  const transactions = responseData?.content.map(mapTransaction) ?? [];

  return (
    <div className={style.list}>
      <div className={style.top}>
        <p className={style.text}>{t("transactionHistory.today")}</p>
        <button className={style.button}>{t("transactionHistory.seeAll")}</button>
      </div>

      <TransactionScroll
        transactions={transactions}
        emptyMessage={t("transaction.empty")}
      />
    </div>
  );
};
