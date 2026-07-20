import { useState } from "react";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

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
  const [amount, setAmount] = useState("36.00");
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const filteredRecipients = recipients.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="md" className={styles.pageContainer}>
      <Box className={styles.page}>
        <Box className={layoutStyles.stack}>
          {/* Карты */}
          <Swiper
            className={styles.cardsSwiper}
            spaceBetween={isDesktop ? 0 : 16}
            slidesPerView={isDesktop ? 1 : 1.15}
            centeredSlides={isDesktop}
            grabCursor
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <CardComponent
                  card={card}
                  hideBg={true}
                  variant={isDesktop ? "desktop" : "default"}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Поиск получателя */}
          <Box className={styles.searchSection}>
            <Box className={styles.searchBox}>
              <input
                type="text"
                placeholder="Поиск по имени или номеру карты"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </Box>
          </Box>

          {/* Получатели */}
          <Box className={isDesktop ? styles.desktopRow : styles.mobileColumn}>
            <Box className={styles.recipientsSection}>
              <Typography sx={{ fontSize: 14 }}>{t("sendMoney.sendTo")}</Typography>
              <Box className={styles.recipientsGrid}>
                <Box className={styles.recipientItem}>
                  <Avatar src={addIcon} sx={{ width: 48, height: 48 }} />
                  <Typography sx={{ fontSize: 11 }}>{t("sendMoney.add")}</Typography>
                </Box>
                {filteredRecipients.map((recipient) => (
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

            {/* Сумма */}
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

          {/* Способы перевода */}
          <Box className={styles.transferOptions}>
            <Box className={styles.option}>
              <AccountBalanceIcon sx={{ fill: "#868686" }} />
              <Box>
                <p>Между своими счетами</p>
              </Box>
            </Box>

            <Box className={styles.option}>
              <CreditCardIcon sx={{ fill: "#868686" }} />
              <Box>
                <p>На карту</p>
                <span>Visa, Mastercard, МИР</span>
              </Box>
            </Box>

            <Box className={styles.option}>
              <PersonIcon sx={{ fill: "#868686" }} />
              <Box>
                <p>На счёт</p>
                <span>По реквизитам</span>
              </Box>
            </Box>

            <Box className={styles.option}>
              <PhoneIcon sx={{ fill: "#868686" }} />
              <Box>
                <p>По номеру телефона</p>
                <span>На карту по номеру</span>
              </Box>
            </Box>
          </Box>

          <button className={styles.sendButton}>{t("sendMoney.sendMoney")}</button>
        </Box>
      </Box>
    </Container>
  );
}
