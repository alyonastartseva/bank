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
import { useTranslation } from "react-i18next";

interface TransferBetweenAccountsProps {
  amount: string;
}

export function TransferBetweenAccounts({ amount }: TransferBetweenAccountsProps) {
  const { t } = useTranslation();
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
          <span>{t("transferBetweenAccounts.history")}</span>
        </Link>
      </div>
      <div className={styles.accountsRow}>
        <TransferAccountCard
          title={t("transferBetweenAccounts.source")}
          account={sourceAccount}
          balanceLabel={t("transferBetweenAccounts.available")}
          balance={sourceAccount.balance}
        />

        <button
          type="button"
          className={styles.swapButton}
          onClick={handleSwapAccounts}
          aria-label={t("transferBetweenAccounts.swapAccounts")}
        >
          <ArrowForwardIcon className={styles.swapIcon} aria-hidden="true" />
        </button>

        <TransferAccountCard
          title={t("transferBetweenAccounts.destination")}
          account={targetAccount}
          balanceLabel={t("transferBetweenAccounts.afterTransfer")}
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
              <div className={styles.detailsTitle}>
                {t("transferBetweenAccounts.exchangeRate")}
              </div>
              <div className={styles.detailsValue}>
                1 {sourceAccount.currency} = {exchangeRate.toFixed(4)}{" "}
                {targetAccount.currency}
              </div>
            </div>
          </div>

          <div className={styles.detailsMeta}>
            <span>{t("transferBetweenAccounts.updated")}</span>
            <InfoOutlinedIcon className={styles.infoIcon} aria-hidden="true" />
          </div>
        </section>

        <section className={styles.detailsCard}>
          <div className={styles.detailsMain}>
            <PercentOutlinedIcon className={styles.detailsIcon} aria-hidden="true" />
            <div className={styles.detailsTitle}>
              {t("transferBetweenAccounts.commission")}
            </div>
          </div>

          <div className={styles.taxFree}>{t("transferBetweenAccounts.free")}</div>
        </section>

        <section className={styles.detailsCard}>
          <div className={styles.detailsMain}>
            <AccountBalanceWalletOutlinedIcon
              className={styles.detailsIcon}
              aria-hidden="true"
            />

            <div className={styles.detailsContent}>
              <div className={styles.detailsTitle}>
                {t("transferBetweenAccounts.recipientGets")}
              </div>

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
              <div className={styles.detailsTitle}>
                {t("transferBetweenAccounts.processingTime")}
              </div>
              <div className={styles.detailsTiming}>
                {t("transferBetweenAccounts.instantly")}
              </div>
            </div>
          </div>
        </section>

        <button type="button" className={styles.transferButton}>
          {t("transferBetweenAccounts.transferButton")}
        </button>
      </div>
    </div>
  );
}
