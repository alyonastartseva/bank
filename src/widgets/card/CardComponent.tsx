import React from "react";
import type { cardType } from "@/shared/types/cardType";
import { Box, Typography, AvatarGroup, Avatar } from "@mui/material";
import NfcIcon from "@mui/icons-material/Nfc";
import ContactlessIcon from "@mui/icons-material/Contactless";
import { CardBg } from "./CardBg";
import styles from "./CardComponent.module.css";
import classNames from "classnames";

type Props = {
  card: cardType;
  variant?: "default" | "desktop";
  className?: string;
  hideBg?: boolean;
};

const formatCardNumber = (value: string) =>
  value
    .replace(/\s+/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();

const CardComponent = ({
  card,
  variant = "default",
  className,
  hideBg = false,
}: Props) => {
  const [cvvVisibility, setCvvVisibility] = React.useState(false);

  const toggleCvvVisibility = () => {
    setCvvVisibility((prev) => !prev);
  };

  return (
    <Box
      className={classNames(
        styles.card,
        variant === "desktop" && styles.desktop,
        className
      )}
    >
      {!hideBg && <CardBg />}
      <Box className={styles.header}>
        <NfcIcon className={styles.nfcIcon} />
        <ContactlessIcon className={styles.contactlessIcon} />
      </Box>
      <Typography className={styles.number}>{formatCardNumber(card.number)}</Typography>

      <Typography className={styles.holder}>{card.holder}</Typography>

      <Box className={styles.footer}>
        <Box className={styles.details}>
          <Box>
            <Typography className={styles.detailLabel}>Expiry Date</Typography>
            <Typography className={styles.detailValue}>{card.expiryDate}</Typography>
          </Box>

          <Box>
            <Typography className={styles.detailLabel}>CVV</Typography>
            <Typography
              onClick={toggleCvvVisibility}
              className={classNames(styles.detailValue, styles.cvv)}
            >
              {cvvVisibility ? card.cvv : "***"}
            </Typography>
          </Box>
        </Box>
        {/* brand */}
        {card.brand.toLowerCase() === "mastercard" && (
          <Box className={styles.brand}>
            <Box>
              <AvatarGroup className={styles.avatarGroup}>
                <Avatar sx={{ bgcolor: "#eb0a24" }}></Avatar>
                <Avatar sx={{ bgcolor: "#F79F1A" }}></Avatar>
              </AvatarGroup>
            </Box>
            <Typography className={styles.brandName}>Mastercard</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CardComponent;
