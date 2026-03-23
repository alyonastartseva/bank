import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooksReducer.ts";
import TransactionItem from "@/shared/ui/transactionItem/TransactionItem.tsx";
import type { Transaction } from "@/shared/types/typesReducer.ts";
import style from "./TransactionList.module.css";
import { sellAllTransactions } from "@/app/store/slices/bankSlice.ts";
import { useTranslation } from "react-i18next";
import { VirtualScroll } from "@/shared/ui/VirtualScroll/VirtualScroll.tsx";

const TransactionList = () => {
  const { t } = useTranslation();
  const transactionList = useAppSelector((state) => state.bank.transactions);
  const dispatch = useAppDispatch();

  const checkTransactionList = () => {
    if (!transactionList || !transactionList.length) {
      return <div>{t("transaction.empty")}</div>;
    }
    return (
      <VirtualScroll
        data={transactionList}
        heightOfItem={42}
        heightOfContainer={400}
        marginBottom={22}
        renderItem={(transaction: Transaction) => (
          <TransactionItem
            key={transaction.id}
            icon={transaction.icon}
            name={transaction.name}
            category={transaction.category}
            price={transaction.price}
          />
        )}
      />
    );
  };

  return (
    <div className={style.list}>
      <div className={style.top}>
        <p className={style.text}>{t("transaction.title")}</p>
        <button className={style.button} onClick={() => dispatch(sellAllTransactions())}>
          {t("transaction.sellAll")}
        </button>
      </div>
      {checkTransactionList()}
    </div>
  );
};

export default TransactionList;
