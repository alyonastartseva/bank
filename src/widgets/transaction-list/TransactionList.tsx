import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useGetTransactionsQuery } from "@/entities/transaction/api/transaction.api";
import { mapTransaction } from "@/entities/transaction/lib/mapTransaction";
import TransactionItem from "@/shared/ui/transactionItem/TransactionItem";
import { VirtualScroll } from "@/shared/ui/VirtualScroll/VirtualScroll";
import { AppRoutes } from "@/shared/config/routes";

import style from "./TransactionList.module.css";

const PAGE_SIZE = 20;

const TransactionList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    data: responseData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetTransactionsQuery({
    page: 0,
    size: PAGE_SIZE,
  });

  const transactions = responseData?.content.map(mapTransaction) ?? [];

  if (isLoading) {
    return <div className={style.list}>Загрузка транзакций...</div>;
  }

  if (isError) {
    return (
      <div className={style.list}>
        <p>Не удалось загрузить транзакции</p>

        <button
          type="button"
          className={style.button}
          onClick={() => refetch()}
        >
          Повторить
        </button>
      </div>
    );
  }

  if (!transactions.length) {
    return <div className={style.list}>{t("transaction.empty")}</div>;
  }

  return (
    <div className={style.list}>
      <div className={style.top}>
        <p className={style.text}>{t("transaction.title")}</p>

        <button
          type="button"
          className={style.button}
          onClick={() => navigate(AppRoutes.TRANSACTION_HISTORY)}
        >
          {t("recentTransactions.viewAll")}
        </button>
      </div>

      {isFetching && <div>Обновление...</div>}

      <VirtualScroll
        data={transactions}
        heightOfItem={42}
        heightOfContainer={300}
        marginBottom={22}
        renderItem={(transaction) => (
          <TransactionItem
            key={transaction.id}
            icon={transaction.icon}
            name={transaction.name}
            category={transaction.category}
            price={transaction.price}
          />
        )}
      />
    </div>
  );
};

export default TransactionList;