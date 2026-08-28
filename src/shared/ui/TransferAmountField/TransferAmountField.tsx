import { Box } from "@mui/material";
import styles from "./TransferAmountField.module.css";
import { formatAmount } from "@/shared/ui/Input/masks";

type TransferAmountFieldProps = {
  label: string;
  changeCurrencyLabel: string;
  currency: string;
  amount: string;
  onChangeCurrency: () => void;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TransferAmountField = ({
  label,
  changeCurrencyLabel,
  currency,
  amount,
  onChangeCurrency,
  onAmountChange,
}: TransferAmountFieldProps) => {
  return (
    <Box className={styles.cardBlock}>
      <div className={styles.amountHeader}>
        <span className={styles.blockLabel}>{label}</span>
        <button className={styles.changeCurrencyLink} onClick={onChangeCurrency}>
          {changeCurrencyLabel}?
        </button>
      </div>
      <div className={styles.amountRow}>
        <span className={styles.currencyLabel}>{currency}</span>
        <input
          type="text"
          className={styles.amountInput}
          value={formatAmount(amount)}
          onChange={onAmountChange}
          inputMode="decimal"
        />
      </div>
    </Box>
  );
};
