import { useState } from "react";
import CardComponent from "@/widgets/card/CardComponent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, useTheme, useMediaQuery, Alert, CircularProgress } from "@mui/material";
import { cardMock } from "@/widgets/card/cardMock";
import { useGetMyAccountsQuery } from "@/entities/account/api/account-api.ts";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import styles from "./InfoAboutCard.module.css";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import goBackIcon from "@/shared/icons/go-back.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
const InfoAboutCard = () => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const formatCardNumber = (value: string) =>
    value
      .replace(/\s+/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const {
    data: accountsResponse,
    isLoading: isAccountsLoading,
    isError: isAccountsError,
  } = useGetMyAccountsQuery();
  const accounts = accountsResponse?.content ?? [];
  return (
    <Box className={layoutStyles.page}>
      <Box className={clsx(layoutStyles.container, styles.pageInfo)}>
        <div className={styles.title}>
          <button className={styles.iconButton} onClick={() => navigate(-1)}>
            <img src={goBackIcon} className={styles.icon} alt="back" />
          </button>
          <h3>{t("infoCard.title")}</h3>
        </div>
        <div className={styles.infoBlock}>
          <Box className={styles.leftBlog}>
            {isAccountsLoading && <CircularProgress />}
            {isAccountsError && <Alert severity="error">{"accounts.loadError"}</Alert>}
            {!isAccountsLoading && !isAccountsError && accounts.length === 0 && (
              <Alert severity="info">{"accounts.empty"}</Alert>
            )}
            {!isAccountsLoading && !isAccountsError && accounts.length > 0 && (
              <CardComponent
                card={cardMock}
                variant={isDesktop ? "desktop" : "default"}
                className={styles.card}
                showDetails={isDetailsVisible}
              />
            )}
            <button
              onClick={() => setIsDetailsVisible((prev) => !prev)}
              className={styles.buttonShowDetails}
            >
              <VisibilityIcon />
              {isDetailsVisible
                ? `${t("infoCard.noShowDetails")}`
                : `${t("infoCard.showDetails")}`}
            </button>
          </Box>
          <Box className={styles.cardInfo}>
            <Box className={styles.cardInfoRow}>
              <Typography className={clsx(styles.cardInfoLabel, styles.numberCard)}>
                {cardMock.brand}{" "}
                {isDetailsVisible
                  ? formatCardNumber(cardMock.number)
                  : `•••• •••• •••• ${cardMock.number.slice(-4)}`}
              </Typography>
              <Typography
                className={clsx(
                  styles.cardInfoValue,
                  cardMock.active === "Активна" ? styles.active : styles.noActive
                )}
              >
                {cardMock.active}
              </Typography>
            </Box>
            <Box className={styles.cardInfoRow}>
              <Typography className={styles.cardInfoLabel}>
                {t("infoCard.typeCard")}
              </Typography>
              <Typography className={styles.cardInfoValue}>{cardMock.type}</Typography>
            </Box>
            <Box className={styles.cardInfoRow}>
              <Typography className={styles.cardInfoLabel}>
                {t("infoCard.currency")}
              </Typography>
              <Typography className={styles.cardInfoValue}>
                {cardMock.currency}
              </Typography>
            </Box>
            <Box className={styles.cardInfoRow}>
              <Typography className={styles.cardInfoLabel}>
                {t("infoCard.status")}
              </Typography>
              <Typography className={styles.cardInfoValue}>{cardMock.active}</Typography>
            </Box>
            <Box className={styles.cardInfoRow}>
              <Typography className={styles.cardInfoLabel}>
                {t("infoCard.available")}
              </Typography>
              <Typography className={styles.cardInfoValue}>
                {cardMock.available} {cardMock.currency}
              </Typography>
            </Box>
            <Box className={styles.cardInfoRow}>
              <Typography className={styles.cardInfoLabel}>
                {t("infoCard.ownFunds")}
              </Typography>
              <Typography className={styles.cardInfoValue}>
                {cardMock.ownFunds} {cardMock.currency}
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default InfoAboutCard;
