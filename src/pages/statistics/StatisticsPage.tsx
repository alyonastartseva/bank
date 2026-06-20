import StatisticChart from "@/entities/statisticChart/StatisticChart";
import TransactionList from "@/widgets/transaction-list/TransactionList";
import Box from "@mui/material/Box";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import { Header } from "@/widgets/header/ui/Header";

export default function StatisticsPage() {
  return (
    <>
    <Header />
    <Box className={layoutStyles.page}>
      <Box className={layoutStyles.container}>
        <div className={layoutStyles.stack}>
          <StatisticChart />
          <TransactionList />
        </div>
      </Box>
    </Box>
    </>
  );
}
