import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Box, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import styles from "./PhoneTransferForm.module.css";
import { transferCards, type TransferCard } from "@/shared/constants/transferCards";
import {
  formatAmount,
  formatPhone,
  parseAmount,
  parsePhone,
} from "@/shared/ui/Input/masks";
import { validatePhone } from "@/shared/ui/Input/validators";
import { CurrencySelectModal } from "@/features/select-currency";
import type { CurrencyCode } from "@/entities/currency";
import { TransferCardSelector } from "@/shared/ui/TransferCardSelector";
import { TransferOptionRow } from "@/shared/ui/TransferOptionRow";
import { TransferAmountField } from "@/shared/ui/TransferAmountField";
import { TransferRecipientReceives } from "@/shared/ui/TransferRecipientReceives";

const MOCK_RECIPIENT = {
  name: "Иван Иванов",
  bank: "Сбербанк",
  initials: "ИИ",
};

const iconSx = { fill: "var(--color-text-secondary)", width: 24 };

export const PhoneTransferForm = () => {
  const { t } = useTranslation();

  const [selectedCard, setSelectedCard] = useState<TransferCard>(transferCards[0]);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("36.00");

  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const isPhoneValid = useMemo(() => {
    const digits = parsePhone(phone);
    return digits.length === 11 && validatePhone(digits).isValid;
  }, [phone]);

  const recipientAmount = useMemo(() => formatAmount(amount).replace(".", ","), [amount]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(parsePhone(e.target.value));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseAmount(e.target.value));
  };

  return (
    <>
      <div className={styles.contentWrapper}>
        {/* С карты */}
        <TransferCardSelector
          cards={transferCards}
          selectedCard={selectedCard}
          onSelect={setSelectedCard}
          label={t("phoneTransfer.fromCard")}
          availableLabel={t("phoneTransfer.available")}
        />

        {/* Номер телефона */}
        <Box className={styles.cardBlock}>
          <div className={styles.phoneInputRow}>
            <div className={styles.phoneInputField}>
              <label className={styles.blockLabel} htmlFor="phoneNumber">
                {t("phoneTransfer.phoneNumber")}
              </label>
              <input
                id="phoneNumber"
                type="tel"
                className={styles.phoneInput}
                placeholder="+7 (___) ___-__-__"
                aria-label={t("phoneTransfer.phoneNumber")}
                value={formatPhone(phone)}
                onChange={handlePhoneChange}
                maxLength={19}
                inputMode="tel"
              />
            </div>
            <IconButton sx={{ flexShrink: 0, padding: 0 }}>
              <ContactsOutlinedIcon sx={{ fill: "#1a73e8", width: 28 }} />
            </IconButton>
          </div>
        </Box>

        {/* Получатель */}
        {isPhoneValid ? (
          <Box className={styles.cardBlock}>
            <div className={styles.recipientBlock}>
              <div className={styles.recipientLeft}>
                <span className={styles.blockLabel}>{t("phoneTransfer.recipient")}</span>

                <div className={styles.recipientRow}>
                  <Avatar className={styles.recipientAvatar}>
                    {MOCK_RECIPIENT.initials}
                  </Avatar>
                  <div className={styles.recipientInfo}>
                    <p className={styles.recipientName}>{MOCK_RECIPIENT.name}</p>
                    <span className={styles.recipientBank}>{MOCK_RECIPIENT.bank}</span>
                  </div>
                </div>
              </div>
              <CheckCircleIcon
                className={styles.checkIcon}
                sx={{ fill: "#4caf50", width: 24, height: 24 }}
              />
            </div>
          </Box>
        ) : (
          <TransferOptionRow
            icon={<PersonIcon sx={iconSx} />}
            title={t("phoneTransfer.recipient")}
            description={t("phoneTransfer.recipientPlaceholder")}
          />
        )}

        {/* Сумма */}
        <TransferAmountField
          label={t("phoneTransfer.amount")}
          changeCurrencyLabel={t("phoneTransfer.changeCurrency")}
          currency={currency}
          amount={amount}
          onChangeCurrency={() => setIsCurrencyOpen(true)}
          onAmountChange={handleAmountChange}
        />

        {/* Комиссия */}
        <TransferOptionRow
          icon={<PercentOutlinedIcon sx={iconSx} />}
          title={t("phoneTransfer.commission")}
          value={t("phoneTransfer.free")}
        />

        {/* Получатель получит */}
        <TransferRecipientReceives
          title={t("phoneTransfer.recipientReceives")}
          currency={currency}
          amount={recipientAmount}
          note={t("phoneTransfer.withoutCommission")}
        />

        {/* Срок зачисления */}
        <TransferOptionRow
          icon={<ScheduleOutlinedIcon sx={iconSx} />}
          title={t("phoneTransfer.term")}
          description={t("phoneTransfer.instantly")}
          showInfo
        />
      </div>

      <button className={styles.sendButton}>{t("phoneTransfer.transferMoney")}</button>

      <CurrencySelectModal
        open={isCurrencyOpen}
        selectedCode={currency}
        onClose={() => setIsCurrencyOpen(false)}
        onConfirm={(code) => {
          setCurrency(code);
          setIsCurrencyOpen(false);
        }}
      />
    </>
  );
};
