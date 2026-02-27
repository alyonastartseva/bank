import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooksReducer.ts";
import TransactionItem from "@/shared/ui/transactionItem/TransactionItem.tsx";
import type { Transaction } from "@/shared/types/typesReducer.ts";
import style from "./TransactionList.module.css";
import { sellAllTransactions } from "@/app/store/slices/bankSlice.ts";

const TransactionList = () => {
  const transactionList = useAppSelector((state) => state.bank.transactions);
  const dispatch = useAppDispatch();

  const checkTransactionList = () => {
    if (!transactionList || !transactionList.length) {
      return <div>Transaction field is empty</div>;
    }
    return (
      <>
        {transactionList.map((transaction: Transaction) => (
          <TransactionItem
            key={transaction.id}
            icon={transaction.icon}
            name={transaction.name}
            category={transaction.category}
            price={transaction.price}
          />
        ))}
      </>
    );
  };

  return (
    <div className={style.list}>
      <div className={style.top}>
        <p className={style.text}>Transaction</p>
        <button className={style.button} onClick={() => dispatch(sellAllTransactions())}>
          Sell All
        </button>
      </div>
      <div className={style.items}>{checkTransactionList()}</div>
    </div>
  );
};

export default TransactionList;
