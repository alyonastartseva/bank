import React from 'react';
import type { cardType } from '@/shared/types/cardType';
import { Box, Typography, AvatarGroup, Avatar} from "@mui/material";
import NfcIcon from '@mui/icons-material/Nfc';
import ContactlessIcon from "@mui/icons-material/Contactless";
import { CardBg } from "./CardBg";



type Props = {
  card: cardType;
};


const formatCardNumber = (value: string) =>
  value.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();

const CardComponent = ({card} :Props) => {
    
    return (
    <Box
      sx={{
        width: 355,
        height: 199,
        maxWidth: "100%",
        borderRadius: 6,
        p: 3,
        bgcolor: "#0E1733",
        boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}>
        <CardBg />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <NfcIcon sx={{ fontSize: 30, opacity: 0.9 }}/>
            <ContactlessIcon sx={{ fontSize: 30, color: "rgba(255,255,255,0.45)" }}/>
        </Box>
      <Typography
        sx={{
          fontSize: 24,
          letterSpacing: 2,
          fontWeight: 300,
          lineHeight: 1.1,
          mt: 2
        }}
      >
        {formatCardNumber(card.number)}
      </Typography>

      <Typography sx={{ mt: 1, fontSize: 13,}}>
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
            <Typography sx={{ fontSize: 9,  color: "#A2A2A7" }}>Expiry Date</Typography>
            <Typography sx={{ mt: 0.5, fontSize: 13,  }}>{card.expiryDate}</Typography>
          </Box>

          <Box>
            <Typography sx={{ fontSize: 9,  color: "#A2A2A7" }}>CVV</Typography>
            <Typography sx={{ mt: 0.5, fontSize: 13,  }}>{card.cvv}</Typography>
          </Box>
        </Box>
        {/* brand */}
        {card.brand.toLowerCase() === "mastercard" && (
            <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box>
                <AvatarGroup sx={{
            "& .MuiAvatar-root": { width: 20, height: 20, border: 0, color: 'transparent' },
        }}>
            <Avatar sx={{bgcolor: "#eb0a24" }}></Avatar>
            <Avatar sx={{bgcolor: "#F79F1A"}}></Avatar>
            
        </AvatarGroup>
            </Box>
            <Typography sx={{ mt: 1, fontSize: 13 }}>
        Mastercard
      </Typography>
        </Box>
        )}
      </Box>
    </Box>
        
  );
};



export default CardComponent;