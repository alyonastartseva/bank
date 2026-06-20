import CardComponent from "@/widgets/card/CardComponent";
import { BottomNavigation, Box } from "@mui/material";
import { cardMock } from "@/widgets/card/cardMock";
import { MonthlyLimit } from "@/widgets/monthly-limit";
import { Header } from "@/widgets/header/ui/Header";
import { RecentTransactions } from "@/widgets/transaction-list/RecentTransactions";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import layoutStyles from "@/shared/styles/pageLayout.module.css";

const MyCardsPage = () => {
  return (
    <>
    <Header />
    <Box className={layoutStyles.page}>
      <DecorativeEllipse />

      <Box className={layoutStyles.container}>
        <div className={layoutStyles.stack}>
          <CardComponent card={cardMock} />
          <RecentTransactions limit={3} />
          <MonthlyLimit />
          <BottomNavigation />
        </div>
      </Box>
    </Box>
    </>
  );
};

export default MyCardsPage;
