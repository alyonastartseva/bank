import StatisticChart from "@/entities/statisticChart/StatisticChart";
import TransactionList from "@/widgets/transaction-list/TransactionList";
import Box from "@mui/material/Box";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import { useMediaQuery } from "@mui/material";
import TransactionTable from "@/widgets/transactionTable/TransactionTable";

export default function StatisticsPage() {
  const isDesktop = useMediaQuery("(min-width: 426px)");

  return (
    <Box className={layoutStyles.page}>
      <Box className={layoutStyles.container} sx={{ padding: 0 }}>
        <div className={layoutStyles.stack}>
          <StatisticChart />
          {isDesktop ? <TransactionTable /> : <TransactionList />}
        </div>
      </Box>
    </Box>
  );
}
