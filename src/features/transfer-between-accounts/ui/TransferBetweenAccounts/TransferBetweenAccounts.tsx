import { useState } from "react";
import { TransferAccountCard } from "../TransferAccountCard/TransferAccountCard";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/shared/config/routes";
import { transferAccounts, USD_TO_EUR_RATE } from "../../model/mocks";
import styles from "./TransferBetweenAccounts.module.css";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface TransferBetweenAccountsProps {
  amount: string;
}

export function TransferBetweenAccounts({ amount }: TransferBetweenAccountsProps) {
  const [sourceAccount, setSourceAccount] = useState(transferAccounts[0]);
  const [targetAccount, setTargetAccount] = useState(transferAccounts[1]);

  const numericAmount = Number(amount);
  const isUsdToEur = sourceAccount.currency === "USD" && targetAccount.currency === "EUR";

  const exchangeRate = isUsdToEur ? USD_TO_EUR_RATE : 1 / USD_TO_EUR_RATE;

  const recipientAmount = numericAmount * exchangeRate;

  const targetBalanceAfterTransfer = targetAccount.balance + recipientAmount;

  const handleSwapAccounts = () => {
    const previousSourceAccount = sourceAccount;
    setSourceAccount(targetAccount);
    setTargetAccount(previousSourceAccount);
  };

  return (
    <div className={styles.page}>
      <div className={styles.pageActions}>
        <Link to={AppRoutes.TRANSACTION_HISTORY} className={styles.historyLink}>
          <HistoryOutlinedIcon aria-hidden="true" />
          <span>История переводов</span>
        </Link>
      </div>
      <div className={styles.accountsRow}>
        <TransferAccountCard
          title="Откуда"
          account={sourceAccount}
          balanceLabel="Доступно"
          balance={sourceAccount.balance}
        />

        <button
          type="button"
          className={styles.swapButton}
          onClick={handleSwapAccounts}
          aria-label="Поменять счета местами"
        >
          <ArrowForwardIcon className={styles.swapIcon} aria-hidden="true" />
        </button>

        <TransferAccountCard
          title="Куда"
          account={targetAccount}
          balanceLabel="После перевода"
          balance={targetBalanceAfterTransfer}
        />
      </div>

      <div className={styles.details}>
        <section className={styles.detailsCard}>
          <div className={styles.detailsMain}>
            <AccountBalanceOutlinedIcon
              className={styles.detailsIcon}
              aria-hidden="true"
            />
            <div className={styles.detailsContent}>
              <div className={styles.detailsTitle}>Курс обмена</div>
              <div className={styles.detailsValue}>
                1 {sourceAccount.currency} = {exchangeRate.toFixed(4)}{" "}
                {targetAccount.currency}
              </div>
            </div>
          </div>

          <div className={styles.detailsMeta}>
            <span>Обновлено 15 секунд назад</span>
            <InfoOutlinedIcon className={styles.infoIcon} aria-hidden="true" />
          </div>
        </section>

        <section className={styles.detailsCard}>
          <div className={styles.detailsMain}>
            <PercentOutlinedIcon className={styles.detailsIcon} aria-hidden="true" />
            <div className={styles.detailsTitle}>Комиссия</div>
          </div>

          <div className={styles.taxFree}>Бесплатно</div>
        </section>

        <section className={styles.detailsCard}>
          <div className={styles.detailsMain}>
            <AccountBalanceWalletOutlinedIcon
              className={styles.detailsIcon}
              aria-hidden="true"
            />

            <div className={styles.detailsContent}>
              <div className={styles.detailsTitle}>Получатель получит</div>

              <div className={styles.recipientValue}>
                <span className={styles.recipientCurrency}>{targetAccount.currency}</span>
                <span>{recipientAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <InfoOutlinedIcon className={styles.infoIcon} aria-hidden="true" />
        </section>

        <section className={styles.detailsCard}>
          <div className={styles.detailsMain}>
            <AccessTimeOutlinedIcon className={styles.detailsIcon} aria-hidden="true" />
            <div className={styles.detailsContent}>
              <div className={styles.detailsTitle}>Срок зачисления</div>
              <div className={styles.detailsTiming}>Моментально</div>
            </div>
          </div>
        </section>

        <button type="button" className={styles.transferButton}>
          Перевести деньги
        </button>
      </div>
    </div>
  );
}
