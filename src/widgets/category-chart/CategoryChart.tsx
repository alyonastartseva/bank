import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useTranslation } from "react-i18next";
import styles from "./CategoryChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Transaction", "Transfer", "Travel", "Food"],
  datasets: [
    {
      data: [55, 15, 15, 15],
      backgroundColor: ["#F572A3", "#B678FF", "#6EF9BF", "#D0AFE5"],
      borderWidth: 0,
      cutout: "85%",
      borderRadius: 12,
      spacing: 7,
      offset: [0, 0, 0, 0],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  animation: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
};

export function CategoryChart() {
  const { t } = useTranslation();

  return (
    <div className={styles.chartContainer}>
      <div className={styles.textChart}>Category Chart</div>
      <div className={styles.chartWrapper}>
        <Doughnut data={data} options={options} />
        <div className={styles.centerText}>
          <div className={styles.percent}>55%</div>
          <div className={styles.percentLabel}>{t("Transaction")}</div>
        </div>
      </div>
      <div className={styles.categoriesList}>
        <div className={styles.categoryItem}>
          <span className={styles.colorBadge} style={{ backgroundColor: "#F572A3" }} />{" "}
          {t("Transaction")}
        </div>
        <div className={styles.categoryItem}>
          <span className={styles.colorBadge} style={{ backgroundColor: "#B678FF" }} />{" "}
          {t("Transfer")}
        </div>
        <div className={styles.categoryItem}>
          <span className={styles.colorBadge} style={{ backgroundColor: "#6EF9BF" }} />{" "}
          {t("Travel")}
        </div>
        <div className={styles.categoryItem}>
          <span className={styles.colorBadge} style={{ backgroundColor: "#D0AFE5" }} />{" "}
          {t("Food")}
        </div>
        <div className={styles.categoryItem}>
          <span className={styles.colorBadge} style={{ backgroundColor: "#FFB347" }} />{" "}
          {t("Shopping")}
        </div>
        <div className={styles.categoryItem}>
          <span className={styles.colorBadge} style={{ backgroundColor: "#FF6B6B" }} />{" "}
          {t("Car")}
        </div>
      </div>
    </div>
  );
}
