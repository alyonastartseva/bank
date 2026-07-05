import CardComponent from "@/widgets/card/CardComponent";
import { BottomNavigation, Box, useTheme, useMediaQuery } from "@mui/material";
import { cardMock } from "@/widgets/card/cardMock";
import { MonthlyLimit } from "@/widgets/monthly-limit";
import { RecentTransactions } from "@/widgets/transaction-list/RecentTransactions";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import styles from "./MyCardsPage.module.css";

const MyCardsPage = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box className={layoutStyles.page}>
      {!isDesktop ? <DecorativeEllipse /> : ""}

      <Box className={layoutStyles.container}>
        <div className={layoutStyles.stack}>
          <Box className={isDesktop ? styles.cardWrapperDesktop : styles.cardWrapper}>
            <CardComponent card={cardMock} variant={isDesktop ? "desktop" : "default"} />
          </Box>

          <RecentTransactions limit={3} />
          <MonthlyLimit />
          <BottomNavigation />
        </div>
      </Box>
    </Box>
  );
};

export default MyCardsPage;
