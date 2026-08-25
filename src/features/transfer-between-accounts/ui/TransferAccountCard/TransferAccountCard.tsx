import type { TransferAccount } from "../../model/types";
import styles from "./TransferAccountCard.module.css";
import mastercardIcon from "@/shared/icons/mastercard.svg";
import visaIcon from "@/shared/icons/visa.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface TransferAccountCardProps {
  title: string;
  account: TransferAccount;
  balanceLabel: string;
  balance: number;
}

const brandIcons: Record<TransferAccount["brand"], string> = {
  Mastercard: mastercardIcon,
  Visa: visaIcon,
};

export function TransferAccountCard({
  title,
  account,
  balanceLabel,
  balance,
}: TransferAccountCardProps) {
  return (
    <section className={styles.card}>
      <div className={styles.title}>{title}</div>

      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={brandIcons[account.brand]} alt="" className={styles.logoImage} />
        </div>

        <div className={styles.accountInfo}>
          <div className={styles.accountLine}>
            <span className={styles.brand}>{account.brand}</span>

            <span className={styles.cardNumber}>•••• {account.lastFourDigits}</span>

            <span className={styles.currency}>{account.currency}</span>
          </div>

          <div className={styles.balanceLabel}>{balanceLabel}</div>

          <div className={styles.balance}>
            {balance.toFixed(2)} {account.currency}
          </div>
        </div>
        <KeyboardArrowDownIcon className={styles.showMore} aria-hidden="true" />
      </div>
    </section>
  );
}
