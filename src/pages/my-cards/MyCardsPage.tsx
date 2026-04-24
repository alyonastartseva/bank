import CardComponent from "@/widgets/card/CardComponent";
import { BottomNavigation, Box } from "@mui/material";
import { cardMock } from "@/widgets/card/cardMock";
import styles from "./MyCardsPage.module.css"
import { MonthlyLimit } from "@/widgets/monthly-limit";
import { RecentTransactions } from "@/widgets/transaction-list/RecentTransactions";

const MyCardsPage = () => {
  return (
    <Box className={styles.page}>
      {/* Декоративный эллипс */}
      <div className={styles.ellipse} />
      
      <Box className={styles.container}>
        <div className={styles.stack}>
          <CardComponent card={cardMock}/>
          <RecentTransactions limit={3} />
          <MonthlyLimit />
          <BottomNavigation />
        </div>
      </Box>
    </Box>
  );
};

export default MyCardsPage;
