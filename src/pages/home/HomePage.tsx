import TransactionList from "@/widgets/transaction-list/TransactionList";
import { Box } from "@mui/material";
import styles from "./HomePage.module.css";
import CardComponent from "@/widgets/card/CardComponent";
import { cardMock } from "@/widgets/card/cardMock";

const HomePage = () => {
  
  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <div className={styles.stack}>
          
          <CardComponent card={cardMock}/>
          <TransactionList />
        </div>
      </Box>
    </Box>
  );
};

export default HomePage;
