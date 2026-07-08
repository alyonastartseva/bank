import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import styles from "./SendMoneyPage.module.css";
import CardComponent from "@/widgets/card/CardComponent";
import { cardMock } from "@/widgets/card/cardMock";
import type { cardType } from "@/shared/types/cardType";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import { useTranslation } from "react-i18next";
import addIcon from "@/shared/icons/Add-circle.svg";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const [amount, setAmount] = useState("36.00");
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null);

  return (
    <Container maxWidth="md" className={styles.pageContainer}>
      <Box className={styles.page}>
        {!isDesktop && <DecorativeEllipse />}

        <Box className={layoutStyles.stack}>
          {/* Блок карточек (адаптивный Swiper) */}
          <Swiper
            className={styles.cardsSwiper}
            spaceBetween={isDesktop ? 0 : 16}
            slidesPerView={isDesktop ? 1 : 1.15}
            centeredSlides={isDesktop}
            grabCursor
            style={{ width: "100%" }}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            simulateTouch={true}
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id} style={{ padding: 0, margin: 0 }}>
                <CardComponent
                  card={card}
                  hideBg={true}
                  variant={isDesktop ? "desktop" : "default"}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Блоки "Кому" и "Сумма" (адаптивные) */}
          <Box className={isDesktop ? styles.desktopRow : styles.mobileColumn}>
            {/* Блок получателей */}
            <Box className={styles.recipientsSection}>
              <Typography sx={{ fontSize: 14 }}>{t("sendMoney.sendTo")}</Typography>
              <Box className={isDesktop ? styles.recipientsGrid : styles.recipientsList}>
                <Box className={styles.recipientItem}>
                  <Avatar src={addIcon} sx={{ width: 48, height: 48 }} />
                  <Typography sx={{ fontSize: 11 }}>{t("sendMoney.add")}</Typography>
                </Box>
                {recipients.map((recipient) => (
                  <Box
                    key={recipient.id}
                    className={`${styles.recipientItem} ${
                      selectedRecipient === recipient.id ? styles.selected : ""
                    }`}
                    onClick={() => setSelectedRecipient(recipient.id)}
                  >
                    <Avatar src={recipient.avatar} sx={{ width: 48, height: 48 }} />
                    <Typography sx={{ fontSize: 11 }}>{recipient.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Блок суммы */}
            <Box className={styles.amountSection}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
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
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Box>
            </Box>
          </Box>

          {/* Кнопка отправки */}
          <button className={styles.sendButton}>{t("sendMoney.sendMoney")}</button>
        </Box>
      </Box>
    </Container>
  );
}
