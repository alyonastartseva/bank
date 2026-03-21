import { useAppDispatch, useAppSelector } from "@/shared/hooks/hooksReducer.ts";
import TransactionItem from "@/shared/ui/transactionItem/TransactionItem.tsx";
import type { Transaction } from "@/shared/types/typesReducer.ts";
import style from "./TransactionList.module.css";
import { sellAllTransactions } from "@/app/store/slices/bankSlice.ts";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

const TransactionList = () => {
  const { t } = useTranslation();
  const transactionList = useAppSelector((state) => state.bank.transactions);
  const dispatch = useAppDispatch();

  // ===Виртуальный скролл ===
  const [scrollTop, setScrollTop] = useState(0);

  // ===Введение констант=== (берутся из стилей)
  const itemHeight = 42 + 22; // Высота конкретного контейнер + gap между ними
  const containerHeight = 400; // Высота всего блока транзакций
  // =========================

  // Расчёты частей необходимых для вирутального скролла
  const totalHeight = transactionList.length * itemHeight
  const visibleCount = Math.ceil(containerHeight / itemHeight)

  const start = Math.floor(scrollTop / itemHeight)
  const end = start + visibleCount;

  const visibleTransactions = transactionList.slice(start, end)

  // ===============================
  const checkTransactionList = () => {
    if (!transactionList || !transactionList.length) {
      return <div>{t('transaction.empty')}</div>;
    }
    return (
      <div
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
          style={{
            height: containerHeight,
            overflowY: 'auto',
            position: 'relative',
          }}
      >
        <div style={{height: totalHeight}}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    transform: `translateY(${start * itemHeight}px)`
                }}
            >
                {visibleTransactions.map((transaction: Transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        icon={transaction.icon}
                        name={transaction.name}
                        category={transaction.category}
                        price={transaction.price}
                    />
                ))}
            </div>
      </div>

      </div>
    );
  };

  return (
    <div className={style.list}>
      <div className={style.top}>
        <p className={style.text}>{t('transaction.title')}</p>
        <button className={style.button} onClick={() => dispatch(sellAllTransactions())}>
          {t('transaction.sellAll')}
        </button>
      </div>
      {checkTransactionList()}
    </div>
  );
};

export default TransactionList;
