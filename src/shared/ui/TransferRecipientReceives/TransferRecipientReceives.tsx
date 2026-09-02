import { Box, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import styles from "./TransferRecipientReceives.module.css";

type TransferRecipientReceivesProps = {
  title: string;
  currency: string;
  amount: string;
  note: string;
};

const iconSx = { fill: "var(--color-text-secondary)", width: 24 };

export const TransferRecipientReceives = ({
  title,
  currency,
  amount,
  note,
}: TransferRecipientReceivesProps) => {
  return (
    <Box className={styles.cardBlock}>
      <div className={styles.optionRow}>
        <AccountBalanceWalletIcon sx={iconSx} />
        <div className={styles.optionContent}>
          <p>{title}</p>
          <div className={styles.amountRow}>
            <span className={styles.currencyLabel}>{currency}</span>
            <span className={styles.amountDisplay}>{amount}</span>
          </div>
          <span className={styles.commissionNote}>{note}</span>
        </div>
        <IconButton sx={{ flexShrink: 0, padding: 0 }}>
          <InfoOutlinedIcon
            sx={{
              fill: "#1a73e8",
              width: 22,
              cursor: "pointer",
            }}
          />
        </IconButton>
      </div>
    </Box>
  );
};
