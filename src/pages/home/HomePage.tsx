import { Box, useMediaQuery } from "@mui/material";
import CardComponent from "@/widgets/card/CardComponent";
import TransactionList from "@/widgets/transaction-list/TransactionList";
import { ProfileHeader } from "@/widgets/profile-header/ui/ProfileHeader";
import { cardMock } from "@/widgets/card/cardMock";
import { ActionButtons } from "@/features/action-buttons/ui/ActionButtons";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import styles from "./HomePage.module.css";
import { CategoryModal } from "@/widgets/category-chart/CategoryChartModal.tsx";
import { useState } from "react";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Box className={styles.page}>
      {!isModalOpen && isMobile && <DecorativeEllipse />}

      <Box className={styles.container}>
        <div className={styles.stack}>
          <ProfileHeader />
          <CardComponent card={cardMock} variant={isMobile ? "default" : "desktop"} />
          <button onClick={() => setIsModalOpen(true)}>Открыть аналитику</button>
          <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <ActionButtons />
          <TransactionList />
        </div>
      </Box>
    </Box>
  );
};

export default HomePage;
