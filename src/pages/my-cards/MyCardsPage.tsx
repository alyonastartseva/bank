import CardComponent from "@/widgets/card/CardComponent";
import {
  BottomNavigation,
  Box,
  useTheme,
  useMediaQuery,
  Alert,
  CircularProgress,
} from "@mui/material";
import { cardMock } from "@/widgets/card/cardMock";
import { MonthlyLimit } from "@/widgets/monthly-limit";
import { RecentTransactions } from "@/widgets/transaction-list/RecentTransactions";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import styles from "./MyCardsPage.module.css";
import { useGetMyAccountsQuery } from "@/entities/account/api/account-api";
import { useTranslation } from "react-i18next";

const MyCardsPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const {
    data: accountsResponse,
    isLoading: isAccountsLoading,
    isError: isAccountsError,
  } = useGetMyAccountsQuery();

  const accounts = accountsResponse?.content ?? [];
  return (
    <Box className={layoutStyles.page}>
      {!isDesktop ? <DecorativeEllipse /> : ""}

      <Box className={layoutStyles.container}>
        <div className={layoutStyles.stack}>
          <Box className={isDesktop ? styles.cardWrapperDesktop : styles.cardWrapper}>
            {isAccountsLoading && <CircularProgress />}
            {isAccountsError && <Alert severity="error">{t("accounts.loadError")}</Alert>}
            {!isAccountsLoading && !isAccountsError && accounts.length === 0 && (
              <Alert severity="info">{t("accounts.empty")}</Alert>
            )}
            {!isAccountsLoading && !isAccountsError && accounts.length > 0 && (
              <CardComponent
                card={cardMock}
                variant={isDesktop ? "desktop" : "default"}
              />
            )}
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
