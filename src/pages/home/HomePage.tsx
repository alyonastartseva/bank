import { Box } from "@mui/material";
import CardComponent from "@/widgets/card/CardComponent";
import TransactionList from "@/widgets/transaction-list/TransactionList";
import { cardMock } from "@/widgets/card/cardMock";
import { Header } from "@/widgets/header/ui/Header";
import { BottomNavigation } from "@/widgets/bottom-navigation/ui/BottomNavigation";
import styles from "./HomePage.module.css";
import { ActionButtons } from "@/features/action-buttons/ui/ActionButtons";

const HomePage = () => {
  
  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <div className={styles.stack}>
          <Header />
          <CardComponent card={cardMock}/>
          <ActionButtons />
          <TransactionList />
          <BottomNavigation />
        </div>
      </Box>
    </Box>
  );
};

export default HomePage;
