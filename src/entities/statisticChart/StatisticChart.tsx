import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "./StatisticChart.module.css";
import { useTranslation } from "react-i18next";

interface StatisticChartProps {
  accountId?: string;
  balance?: { currency: string; balance: number };
  isLoading?: boolean;
  error?: unknown;
  onRefresh?: () => void;
}

const dataTransaction = [
  { month: "Oct", spendings: 2.2 },
  { month: "Nov", spendings: 5.3 },
  { month: "Dec", spendings: 3.0 },
  { month: "Jan", spendings: 6.8 },
  { month: "Feb", spendings: 4.2 },
  { month: "Mar", spendings: 8.6 },
];

const months = dataTransaction.map((x) => x.month);
const seriesData = dataTransaction.map((x) => x.spendings);

export default function StatisticChart({
  balance,
  isLoading = false,
  error,
}: StatisticChartProps) {
  const [selected, setSelected] = React.useState<string>("Jan");
  const selectedIndex = months.indexOf(selected);
  const { t } = useTranslation();

  // ✅ Полностью безопасная функция отображения баланса
  const getDisplayBalance = React.useMemo(() => {
    // Если загрузка
    if (isLoading) {
      return t("common.loading") || "Загрузка...";
    }

    // Если ошибка
    if (error) {
      return "Ошибка загрузки";
    }

    // Если нет данных о балансе
    if (!balance) {
      return "$8,545.00";
    }

    // ✅ Проверяем balance.balance
    const balanceValue = balance.balance;

    // Если balance.balance === undefined или null
    if (balanceValue === undefined || balanceValue === null) {
      return `${balance.currency || ""} 0.00`;
    }

    // Если balance.balance не число
    if (typeof balanceValue !== "number") {
      return `${balance.currency || ""} 0.00`;
    }

    // ✅ Безопасно вызываем toFixed
    return `${balance.currency || ""} ${balanceValue.toFixed(2)}`;
  }, [balance, isLoading, error, t]);

  return (
    <Box className={styles.root}>
      <Box className={styles.balanceBlock}>
        <Typography
          variant="body2"
          className={styles.label}
          sx={{
            fontSize: "14px",
            "@media (min-width: 1025px)": {
              fontSize: "18px",
            },
          }}
        >
          {t("accountsManagement.balance")}
        </Typography>

        <Typography
          className={styles.balance}
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            "@media (min-width: 426px)": {
              fontSize: "28px",
              fontWeight: 600,
            },
            "@media (min-width: 1025px)": {
              fontSize: "42px",
              fontWeight: 600,
            },
          }}
        >
          {getDisplayBalance}
        </Typography>
      </Box>

      <Box className={styles.chartWrap}>
        <LineChart
          className={styles.chart}
          series={[
            {
              type: "line",
              data: seriesData,
              curve: "catmullRom",
              showMark: ({ index }) => index === selectedIndex,
              area: true,
            },
          ]}
          xAxis={[
            {
              scaleType: "point",
              data: months,
              tickLabelStyle: { display: "none" },
              disableTicks: true,
              disableLine: true,
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: 10,
              disableLine: true,
              disableTicks: true,
              tickLabelStyle: { display: "none" },
            },
          ]}
          grid={{ horizontal: false, vertical: true }}
          margin={{ top: -20, right: 15, bottom: -10, left: -30 }}
        />
      </Box>

      <Box className={styles.months}>
        {months.map((m) => {
          const isActive = m === selected;

          return (
            <Box
              key={m}
              onClick={() => setSelected(m)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelected(m);
              }}
              className={`${styles.month} ${isActive ? styles.monthActive : ""}`}
            >
              {m}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
