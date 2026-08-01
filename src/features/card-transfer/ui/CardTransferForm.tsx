import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarGroup, Box, IconButton } from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CropFreeIcon from "@mui/icons-material/CropFree";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./CardTransferForm.module.css";
import { cardMock } from "@/widgets/card/cardMock";
import type { cardType } from "@/shared/types/cardType";
import { formatCardNumber, parseCardNumber } from "@/shared/ui/Input/masks";
import { validateCard } from "@/shared/ui/Input/validators";

const cards: (cardType & { balance: string })[] = [
  { ...cardMock, balance: "2 458,65" },
  {
    id: "card-2",
    number: "5412751234567890",
    holder: "AR Jonson",
    expiryDate: "12/2028",
    cvv: "123",
    brand: "mastercard",
    balance: "1 200,00",
  },
  {
    id: "card-3",
    number: "4000123412341234",
    holder: "AR Jonson",
    expiryDate: "08/2029",
    cvv: "456",
    brand: "mastercard",
    balance: "5 430,00",
  },
];

const lastDigits = (cardNumber: string) => {
  const digits = cardNumber.replace(/\s/g, "");
  return digits.slice(-4);
};

const iconSx = { fill: "var(--color-text-secondary)", width: 24 };

export const CardTransferForm = () => {
  const { t } = useTranslation();

  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [showCardSelector, setShowCardSelector] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const parsed = parseCardNumber(raw);
    setCardNumber(parsed);

    if (parsed.length === 16 && validateCard(parsed).isValid) {
      setRecipientName("AR Jonson");
    } else {
      setRecipientName("");
    }
  };

  return (
    <>
      <div className={styles.contentWrapper}>
        {/* С карты */}
        <Box
          className={styles.cardBlock}
          sx={{ cursor: "pointer" }}
          onClick={() => setShowCardSelector(!showCardSelector)}
        >
          <span className={styles.blockLabel}>{t("cardTransfer.fromCard")}</span>

          <div className={styles.cardSelectorRow}>
            <Box className={styles.brandLogo}>
              <AvatarGroup sx={{ gap: "1px" }}>
                <Avatar sx={{ bgcolor: "#eb0a24" }} />
                <Avatar sx={{ bgcolor: "#F79F1A" }} />
              </AvatarGroup>
            </Box>

            <div className={styles.cardSelectorInfo}>
              <div className={styles.cardBrandRow}>
                <span className={styles.cardBrandName}>Mastercard</span>
                <span className={styles.cardLastDigits}>
                  &#8226;&#8226;&#8226;&#8226; {lastDigits(selectedCard.number)}
                </span>
                <span className={styles.currencyBadge}>USD</span>
              </div>
              <span className={styles.availableLabel}>{t("cardTransfer.available")}</span>
              <span className={styles.availableAmount}>{selectedCard.balance} USD</span>
            </div>

            <IconButton sx={{ padding: 0, flexShrink: 0 }}>
              <KeyboardArrowDownIcon
                sx={{
                  fill: "var(--color-text-secondary)",
                  fontSize: 24,
                  transform: showCardSelector ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              />
            </IconButton>
          </div>

          {showCardSelector && (
            <div className={styles.cardList}>
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`${styles.cardListItem} ${
                    selectedCard.id === card.id ? styles.cardListItemSelected : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCard(card);
                    setShowCardSelector(false);
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

        {/* Номер карты получателя */}
        <Box className={styles.cardBlock}>
          <div className={styles.cardInputRow}>
            <CreditCardIcon sx={{ ...iconSx, flexShrink: 0 }} />
            <div className={styles.cardInputField}>
              <label className={styles.blockLabel}>{t("cardTransfer.cardNumber")}</label>
              <input
                type="text"
                className={styles.cardInput}
                placeholder="0000 0000 0000 0000"
                value={formatCardNumber(cardNumber)}
                onChange={handleCardNumberChange}
                maxLength={19}
                inputMode="numeric"
              />
            </div>
            <IconButton sx={{ flexShrink: 0, padding: 0 }}>
              <CropFreeIcon sx={{ fill: "#1a73e8", width: 28 }} />
            </IconButton>
          </div>
        </Box>

        {/* Получатель */}
        <Box className={styles.cardBlock}>
          <div className={styles.optionRow}>
            <PersonIcon sx={iconSx} />
            <div className={styles.optionContent}>
              <p>{t("cardTransfer.recipient")}</p>
              {recipientName ? (
                <span className={styles.recipientName}>{recipientName}</span>
              ) : (
                <span>{t("cardTransfer.recipientPlaceholder")}</span>
              )}
            </div>
          </div>
        </Box>

        {/* Комиссия */}
        <Box className={styles.cardBlock}>
          <div className={styles.optionRow}>
            <PercentOutlinedIcon sx={iconSx} />
            <div className={styles.optionContent}>
              <p>{t("cardTransfer.commission")}</p>
            </div>
            <span className={styles.commissionValue}>{t("cardTransfer.free")}</span>
          </div>
        </Box>

        {/* Срок зачисления */}
        <Box className={styles.cardBlock}>
          <div className={styles.optionRow}>
            <ScheduleOutlinedIcon sx={iconSx} />
            <div className={styles.optionContent}>
              <p>{t("cardTransfer.term")}</p>
              <span>{t("cardTransfer.instantly")}</span>
            </div>
            <InfoOutlinedIcon
              sx={{
                fill: "#1a73e8",
                width: 22,
                cursor: "pointer",
              }}
            />
          </div>
        </Box>
      </div>

      <button className={styles.sendButton}>{t("cardTransfer.transferMoney")}</button>
    </>
  );
};
