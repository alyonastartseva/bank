import { Box } from "@mui/material";
import { Header } from "@/widgets/header/ui/Header";
import { TransactionHistoryList } from "@/widgets/transaction-history-list";
import layoutStyles from "@/shared/styles/pageLayout.module.css";

const TransactionHistoryPage = () => {
  return (
    <>
    <Header />
    <Box className={layoutStyles.page}>
      <Box className={layoutStyles.container}>
        <TransactionHistoryList />
      </Box>
    </Box>
    </>
  );
};

export default TransactionHistoryPage;
