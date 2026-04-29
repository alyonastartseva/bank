import { useAppSelector } from "@/shared/hooks/hooksReducer";
import { useTranslation } from "react-i18next";
import { TransactionScroll } from "@/shared/ui/TransactionScroll/TransactionScroll";
import style from "./TransactionHistoryList.module.css";

export const TransactionHistoryList = () => {
  const { t } = useTranslation();
  const transactions = useAppSelector((state) => state.bank.transactions);

  return (
    <div className={style.list}>
      <div className={style.top}>
        <p className={style.text}>{t("transactionHistory.today")}</p>
        <button className={style.button}>{t("transactionHistory.seeAll")}</button>
      </div>
      <TransactionScroll transactions={transactions} emptyMessage={t("transaction.empty")} />
    </div>
  );
};