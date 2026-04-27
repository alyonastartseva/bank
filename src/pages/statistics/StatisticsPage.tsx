import StatisticChart from "@/entities/statisticChart/StatisticChart";
import TransactionList from "@/widgets/transaction-list/TransactionList";
import Box from "@mui/material/Box";
import layoutStyles from "@/shared/styles/pageLayout.module.css";

export default function StatisticsPage() {
  return (
    <Box className={layoutStyles.page}>
      <Box className={layoutStyles.container}>
        <div className={layoutStyles.stack}>
          <StatisticChart />
          <TransactionList />
        </div>
      </Box>
    </Box>
  );
}