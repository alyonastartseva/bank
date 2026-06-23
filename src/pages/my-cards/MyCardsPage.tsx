import CardComponent from "@/widgets/card/CardComponent";
import { BottomNavigation, Box, useTheme, useMediaQuery } from "@mui/material";
import { cardMock } from "@/widgets/card/cardMock";
import { MonthlyLimit } from "@/widgets/monthly-limit";
import { RecentTransactions } from "@/widgets/transaction-list/RecentTransactions";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import layoutStyles from "@/shared/styles/pageLayout.module.css";

const MyCardsPage = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box className={layoutStyles.page}>
      {!isDesktop ? <DecorativeEllipse /> : ""}

      <Box className={layoutStyles.container}>
        <div className={layoutStyles.stack}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: isDesktop ? "start" : "center",
              border: isDesktop ? `1px solid var(--color-br)` : "none",
              borderRadius: isDesktop ? `var(--radius-md)` : 0,
              padding: isDesktop ? "20px" : 0,
            }}
          >
            <CardComponent card={cardMock} />
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
