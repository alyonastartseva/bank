import { Box } from "@mui/material";
import { TransactionHistoryList } from "@/widgets/transaction-history-list";
import layoutStyles from "@/shared/styles/pageLayout.module.css";

const TransactionHistoryPage = () => {
  return (
    <Box className={layoutStyles.page}>
      <Box className={layoutStyles.container}>
        <TransactionHistoryList />
      </Box>
    </Box>
  );
};

export default TransactionHistoryPage;
