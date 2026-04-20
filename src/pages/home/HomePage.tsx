import { Box } from "@mui/material";
import CardComponent from "@/widgets/card/CardComponent";
import TransactionList from "@/widgets/transaction-list/TransactionList";
import { ProfileHeader } from "@/widgets/profile-header/ui/ProfileHeader";
import { cardMock } from "@/widgets/card/cardMock";
import { ActionButtons } from "@/features/action-buttons/ui/ActionButtons";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import styles from "./HomePage.module.css";

const HomePage = () => {
  
  return (
    <Box className={styles.page}>
       <DecorativeEllipse />
      
      <Box className={styles.container}>
        <div className={styles.stack}>
          <ProfileHeader />
          <CardComponent card={cardMock}/>
          <ActionButtons />
          <TransactionList />
        </div>
      </Box>
    </Box>
  );
};

export default HomePage;
