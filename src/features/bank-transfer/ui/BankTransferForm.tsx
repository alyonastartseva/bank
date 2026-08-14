import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarGroup, Box, IconButton } from "@mui/material";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import styles from "./BankTransferForm.module.css";
import { cardMock } from "@/widgets/card/cardMock";
import type { cardType } from "@/shared/types/cardType";
import { formatAmount, parseAmount } from "@/shared/ui/Input/masks";

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

export const BankTransferForm = () => {
  const { t } = useTranslation();

  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [showCardSelector, setShowCardSelector] = useState(false);
  const [amount, setAmount] = useState("36.00");

  const [bankCountry, setBankCountry] = useState("США");
  const [recipient, setRecipient] = useState("John Smith");
  const [accountNumber, setAccountNumber] = useState("US12 3456 7890 1234 5678 9012");
  const [bank, setBank] = useState("JPMorgan Chase Bank, N.A.");
  const [swift, setSwift] = useState("CHASUS33XXX");

  const recipientAmount = useMemo(
    () =>
      Math.max(0, (parseFloat(amount) || 0) - 5)
        .toFixed(2)
        .replace(".", ","),
    [amount]
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseAmount(e.target.value);
    setAmount(parsed);
  };

  return (
    <>
      <div className={styles.contentWrapper}>
        {/* Спишется с */}
        <Box
          className={styles.cardBlock}
          sx={{ cursor: "pointer" }}
          onClick={() => setShowCardSelector(!showCardSelector)}
        >
          <span className={styles.blockLabel}>{t("bankTransfer.fromCard")}</span>

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
              </div>
            </div>

            <span className={styles.cardBalance}>{selectedCard.balance} USD</span>

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

        {/* Введите сумму */}
        <Box className={styles.cardBlock}>
          <div className={styles.amountHeader}>
            <span className={styles.blockLabel}>{t("bankTransfer.enterAmount")}</span>
            <span className={styles.changeCurrencyLink}>
              {t("bankTransfer.changeCurrency")}?
            </span>
          </div>
          <div className={styles.amountRow}>
            <span className={styles.currencyLabel}>USD</span>
            <input
              type="text"
              className={styles.amountInput}
              value={formatAmount(amount)}
              onChange={handleAmountChange}
              inputMode="decimal"
            />
          </div>
        </Box>

        {/* Реквизиты получателя */}
        <Box className={styles.cardBlock}>
          <div className={styles.detailsHeader}>
            <span className={styles.blockLabel}>
              {t("bankTransfer.recipientDetails")}
            </span>
            <span className={styles.saveDetailsLink}>
              {t("bankTransfer.saveDetails")}
            </span>
          </div>
          <div className={styles.detailsList}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t("bankTransfer.bankCountry")}</span>
              <input
                type="text"
                className={styles.detailInput}
                value={bankCountry}
                onChange={(e) => setBankCountry(e.target.value)}
              />
            </div>
            <div className={styles.divider} />
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t("bankTransfer.recipient")}</span>
              <input
                type="text"
                className={styles.detailInput}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className={styles.divider} />
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>
                {t("bankTransfer.accountNumber")}
              </span>
              <input
                type="text"
                className={styles.detailInput}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className={styles.divider} />
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t("bankTransfer.bank")}</span>
              <input
                type="text"
                className={styles.detailInput}
                value={bank}
                onChange={(e) => setBank(e.target.value)}
              />
            </div>
            <div className={styles.divider} />
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t("bankTransfer.swift")}</span>
              <input
                type="text"
                className={styles.detailInput}
                value={swift}
                onChange={(e) => setSwift(e.target.value)}
              />
            </div>
            <div className={styles.divider} />
          </div>
        </Box>

        {/* комиссия */}
        <Box className={styles.cardBlock}>
          <div className={styles.optionRow}>
            <PercentOutlinedIcon sx={iconSx} />
            <div className={styles.optionContent}>
              <p>{t("bankTransfer.commission")}</p>
            </div>
            <span className={styles.commissionValue}>5,00 USD</span>
            <KeyboardArrowDownIcon
              sx={{ fill: "var(--color-text-secondary)", fontSize: 24 }}
            />
          </div>
        </Box>

        {/* Получатель получит */}
        <Box className={styles.cardBlock}>
          <div className={styles.optionRow}>
            <AccountBalanceWalletIcon sx={iconSx} />
            <div className={styles.optionContent}>
              <p>{t("bankTransfer.recipientReceives")}</p>
              <div className={`${styles.amountRow} ${styles.amountRowSpaced}`}>
                <span className={styles.currencyLabel}>USD</span>
                <span className={styles.amountInput}>{recipientAmount}</span>
              </div>
              <span className={styles.commissionNote}>
                {t("bankTransfer.withCommission")}
              </span>
            </div>
            <IconButton sx={{ flexShrink: 0, padding: 0 }}>
              <InfoOutlinedIcon
                sx={{
                  fill: "#1a73e8",
                  width: 22,
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </div>
        </Box>

        {/* Срок зачисления */}
        <Box className={styles.cardBlock}>
          <div className={styles.optionRow}>
            <ScheduleOutlinedIcon sx={iconSx} />
            <div className={styles.optionContent}>
              <p>{t("bankTransfer.term")}</p>
              <span className={styles.termValue}>{t("bankTransfer.termValue")}</span>
            </div>
            <IconButton sx={{ flexShrink: 0, padding: 0 }}>
              <InfoOutlinedIcon
                sx={{
                  fill: "#1a73e8",
                  width: 22,
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </div>
        </Box>
      </div>

      <button className={styles.sendButton}>{t("bankTransfer.transferMoney")}</button>
    </>
  );
};
