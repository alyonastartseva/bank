import { Box, IconButton } from "@mui/material";
import styles from "./TransferOptionRow.module.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type TransferOptionRowProps = {
  icon: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  value?: string;
  valueTone?: "success" | "muted";
  showInfo?: boolean;
  trailing?: React.ReactNode;
};

export const TransferOptionRow = ({
  icon,
  title,
  description,
  value,
  valueTone = "success",
  showInfo,
  trailing,
}: TransferOptionRowProps) => {
  const valueClass = valueTone === "success" ? styles.value : styles.mutedValue;
  return (
    <Box className={styles.cardBlock}>
      <div className={styles.optionRow}>
        {icon}
        <div className={styles.optionContent}>
          <p>{title}</p>
          {description && <span className={styles.description}>{description}</span>}
        </div>
        {value && <span className={valueClass}>{value}</span>}
        {trailing}
        {showInfo && (
          <IconButton sx={{ flexShrink: 0, padding: 0 }}>
            <InfoOutlinedIcon sx={{ fill: "#1a73e8", width: 22, cursor: "pointer" }} />
          </IconButton>
        )}
      </div>
    </Box>
  );
};
