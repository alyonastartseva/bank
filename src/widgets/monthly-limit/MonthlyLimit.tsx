import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Slider, Typography, Box } from "@mui/material";
import styles from "./MonthlyLimit.module.css";

interface MonthlyLimitProps {
  initialLimit?: number;
}

export const MonthlyLimit = ({ initialLimit = 4600 }: MonthlyLimitProps) => {
  const { t } = useTranslation();
  const [limit, setLimit] = useState(initialLimit);

  const handleLimitChange = (_event: Event, newValue: number | number[]) => {
    setLimit(newValue as number);
  };

  return (
    <Box className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.title}>{t("monthlyLimit.title")}</p>
      </div>

      <Box className={styles.card}>
        <Typography className={styles.amount}>
          {t("monthlyLimit.amount")}: ${limit.toLocaleString()}
        </Typography>

        <Box>
          <Slider
            value={limit}
            onChange={handleLimitChange}
            min={0}
            max={10000}
            step={100}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `$${value}`}
            sx={{
              color: 'var(--color-primary)',
              '& .MuiSlider-thumb': { backgroundColor: 'var(--color-primary)' },
              '& .MuiSlider-track': { backgroundColor: 'var(--color-primary)' },
              '& .MuiSlider-rail': { backgroundColor: 'var(--color-text-muted)' },
            }}
          />
          <Box className={styles.labels}>
            <span>$0</span>
            <span>${limit / 2}</span>
            <span>${limit}</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};