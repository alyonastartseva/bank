import React from "react";
import type { cardType } from "@/shared/types/cardType";
import {
  Box,
  Typography,
  AvatarGroup,
  Avatar,
  type SxProps,
  type Theme,
} from "@mui/material";
import NfcIcon from "@mui/icons-material/Nfc";
import ContactlessIcon from "@mui/icons-material/Contactless";
import { CardBg } from "./CardBg";

type Props = {
  card: cardType;
  variant?: "default" | "desktop";
  sx?: SxProps<Theme>;
};

const formatCardNumber = (value: string) =>
  value
    .replace(/\s+/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();

const CardComponent = ({ card, variant, sx }: Props) => {
  const [cvvVisibility, setCvvVisibility] = React.useState(false);
  const isDesktop = variant === "desktop";

  const toggleCvvVisibility = () => {
    setCvvVisibility((prev) => !prev);
  };

  return (
    <Box
      sx={{
        height: 199,
        width: "100%",
        maxWidth: "650px",
        borderRadius: 6,
        p: 3,
        bgcolor: "#0E1733",
        boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        ...sx,
      }}
    >
      <CardBg />
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <NfcIcon sx={{ fontSize: 30, opacity: 0.9 }} />
        <ContactlessIcon sx={{ fontSize: 30, color: "rgba(255,255,255,0.45)" }} />
      </Box>
      <Typography
        sx={{
          fontSize: isDesktop ? 28 : 24,
          letterSpacing: 2,
          fontWeight: 300,
          lineHeight: 1.1,
          mt: 2,
        }}
      >
        {formatCardNumber(card.number)}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          fontSize: isDesktop ? 16 : 13,
        }}
      >
        {card.holder}
      </Typography>

      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box>
            <Typography
              sx={{
                fontSize: isDesktop ? 13 : 9,
                color: "#A2A2A7",
              }}
            >
              Expiry Date
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                fontSize: isDesktop ? 14 : 13,
              }}
            >
              {card.expiryDate}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: isDesktop ? 13 : 9,
                color: "#A2A2A7",
              }}
            >
              CVV
            </Typography>
            <Typography
              onClick={toggleCvvVisibility}
              sx={{
                mt: 0.5,
                fontSize: isDesktop ? 14 : 13,
                cursor: "pointer",
              }}
            >
              {cvvVisibility ? card.cvv : "***"}
            </Typography>
          </Box>
        </Box>
        {/* brand */}
        {card.brand.toLowerCase() === "mastercard" && (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box>
              <AvatarGroup
                sx={{
                  "& .MuiAvatar-root": {
                    width: 20,
                    height: 20,
                    border: 0,
                    color: "transparent",
                  },
                }}
              >
                <Avatar sx={{ bgcolor: "#eb0a24" }}></Avatar>
                <Avatar sx={{ bgcolor: "#F79F1A" }}></Avatar>
              </AvatarGroup>
            </Box>
            <Typography sx={{ mt: 1, fontSize: 13 }}>Mastercard</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CardComponent;
