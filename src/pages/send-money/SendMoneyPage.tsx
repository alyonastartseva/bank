import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import styles from "./SendMoneyPage.module.css";
import CardComponent from "@/widgets/card/CardComponent.tsx";
import { cardMock } from "@/widgets/card/cardMock.ts";
import type { cardType } from "@/shared/types/cardType.ts";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import { useTranslation } from "react-i18next";
import addIcon from "@/shared/icons/Add-circle.svg"
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const recipients = [
  { id: 1, name: "Yamilet", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Alexa", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Yakub", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Krishna", avatar: "https://i.pravatar.cc/150?img=4" },
];

const cards: cardType[] = [
  cardMock,
  {
    id: "card-2",
    number: "5412751234567890",
    holder: "AR Jonson",
    expiryDate: "12/2028",
    cvv: "123",
    brand: "mastercard",
  },
  {
    id: "card-3",
    number: "4000123412341234",
    holder: "AR Jonson",
    expiryDate: "08/2029",
    cvv: "456",
    brand: "mastercard",
  },
];

export default function SendMoneyPage() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("36.00");
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null);

  return (
    <Box className={styles.page}>
      <DecorativeEllipse />
      <Box className={layoutStyles.stack}>

        {/* Блок карточек */}
        <Swiper
          className={styles.cardsSwiper}
          spaceBetween={16}
          slidesPerView={1.15}
          grabCursor
          centeredSlides
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <CardComponent card={card} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Блок получателей */}
        <Box className={styles.recipientsSection}>
          <Typography sx={{ fontSize: 14 }}>{t("sendMoney.sendTo")}</Typography>

          <Box className={styles.recipientsList}>
            <Box className={styles.recipientItem}>
              <Avatar src={addIcon} sx={{ width: 48, height: 48 }} />
              <Typography sx={{ fontSize: 11 }}>{t("sendMoney.add")}</Typography>
            </Box>

            {recipients.map((recipient) => (
              <Box
                key={recipient.id}
                className={`${styles.recipientItem} ${selectedRecipient === recipient.id ? styles.selected : ""}`}
                onClick={() => setSelectedRecipient(recipient.id)}
              >
                <Avatar src={recipient.avatar} sx={{ width: 48, height: 48 }} />
                <Typography sx={{ fontSize: 11 }}>{recipient.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Секция отправки */}
        <Box className={styles.amountSection}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
            <Typography className={styles.amountLabel} sx={{ fontSize: 11 }}>
              {t("sendMoney.enterAmount")}
            </Typography>
            <button className={styles.changeCurrency}>
              {t("sendMoney.changeCurrency")}
            </button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span className={styles.amountCurrency}>USD</span>
            <input
              className={styles.amountInput}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Кнопка отправки */}
      <button className={styles.sendButton}>{t("sendMoney.sendMoney")}</button>
    </Box>
  );
}
