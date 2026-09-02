import { useState } from "react";
import { Avatar, AvatarGroup, Box, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./TransferCardSelector.module.css";
import { lastDigits } from "@/shared/ui/Input/masks";
import type { TransferCard } from "@/shared/constants/transferCards";

type TransferCardSelectorProps = {
  cards: TransferCard[];
  selectedCard: TransferCard;
  onSelect: (card: TransferCard) => void;
  label?: string;
  variant?: "detailed" | "compact";
  availableLabel?: string;
};

export const TransferCardSelector = ({
  cards,
  selectedCard,
  onSelect,
  label,
  variant = "detailed",
  availableLabel,
}: TransferCardSelectorProps) => {
  const [open, setOpen] = useState(false);
  const isCompact = variant === "compact";

  return (
    <Box
      className={styles.cardBlock}
      sx={{ cursor: "pointer" }}
      onClick={() => setOpen(!open)}
    >
      <span className={styles.blockLabel}>{label}</span>

      <div className={styles.cardSelectorRow}>
        <Box className={isCompact ? styles.brandLogoCompact : styles.brandLogo}>
          <AvatarGroup sx={{ gap: "1px" }}>
            <Avatar sx={{ bgcolor: "#eb0a24" }} />
            <Avatar sx={{ bgcolor: "#F79F1A" }} />
          </AvatarGroup>
        </Box>

        <div className={styles.cardSelectorInfo}>
          <div className={styles.cardBrandRow}>
            <span
              className={isCompact ? styles.cardBrandNameCompact : styles.cardBrandName}
            >
              Mastercard
            </span>
            <span
              className={isCompact ? styles.cardLastDigitsCompact : styles.cardLastDigits}
            >
              &#8226;&#8226;&#8226;&#8226; {lastDigits(selectedCard.number)}
            </span>
            {!isCompact && <span className={styles.currencyBadge}>USD</span>}
          </div>
          {!isCompact && availableLabel && (
            <>
              <span className={styles.availableLabel}>{availableLabel}</span>
              <span className={styles.availableAmount}>{selectedCard.balance} USD</span>
            </>
          )}
        </div>

        {isCompact && (
          <span className={styles.compactBalance}>{selectedCard.balance} USD</span>
        )}

        <IconButton sx={{ padding: 0, flexShrink: 0 }}>
          <KeyboardArrowDownIcon
            sx={{
              fill: "var(--color-text-secondary)",
              fontSize: 24,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </IconButton>
      </div>

      {open && (
        <div className={styles.cardList}>
          {cards.map((card) => (
            <div
              key={card.id}
              className={`${styles.cardListItem} ${
                selectedCard.id === card.id ? styles.cardListItemSelected : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(card);
                setOpen(false);
              }}
            >
              <span className={styles.cardBrandName}>
                Mastercard &#8226;&#8226;&#8226;&#8226; {lastDigits(card.number)}
              </span>
              <span className={styles.cardBalance}>{card.balance} USD</span>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};
