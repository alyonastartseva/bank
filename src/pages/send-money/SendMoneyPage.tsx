import { type ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
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
import { CurrencySelectModal } from "@/features/select-currency";
import type { CurrencyCode } from "@/entities/currency";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/shared/config/routes";

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
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const [amount, setAmount] = useState("36.00");
  const [selectedRecipient, setSelectedRecipient] = useState<number | null>(null);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [search, setSearch] = useState("");
  const filteredRecipients = recipients.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.currentTarget.value);
  };
  const handleRecipientSelect = (id: number) => {
    setSelectedRecipient(id);
  };
  const handleTransferBetweenAccounts = () => {
    navigate(AppRoutes.TRANSFER_BETWEEN_ACCOUNTS, {
      state: { amount },
    });
  };
  return (
    <Container maxWidth="md" className={styles.pageContainer}>
      <Box className={styles.page}>
        <Box className={layoutStyles.stack}>
          <div className={styles.swiperWrapper}>
            {/* Карты */}
            <Swiper
              className={styles.cardsSwiper}
              spaceBetween={isDesktop ? 0 : 16}
              slidesPerView={isDesktop ? 1 : 1.15}
              centeredSlides={isDesktop}
              grabCursor
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: `.${styles.customPrev}`,
                nextEl: `.${styles.customNext}`,
              }}
              pagination={{ clickable: true }}
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

            <div className={styles.customPrev}></div>
            <div className={styles.customNext}></div>
          </div>
          {/* Поиск получателя */}
          <Box className={styles.searchSection}>
            <Box className={styles.searchBox}>
              <input
                type="text"
                placeholder="Поиск по имени или номеру карты"
                value={search}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </Box>
          </Box>

          {/* Получатели */}
          <Box className={isDesktop ? styles.desktopRow : styles.mobileColumn}>
            <Box className={styles.recipientsSection}>
              <Typography sx={{ fontSize: 14 }}>{t("sendMoney.sendTo")}</Typography>
              <Box className={isDesktop ? styles.recipientsGrid : styles.recipientsList}>
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
                    onClick={() => handleRecipientSelect(recipient.id)}
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
                <button
                  type="button"
                  className={styles.changeCurrency}
                  onClick={() => setIsCurrencyOpen(true)}
                >
                  {t("sendMoney.changeCurrency")}
                </button>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span className={styles.amountCurrency}>{currency}</span>
                <input
                  className={styles.amountInput}
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </Box>
            </Box>
          </Box>

          {/* Способы перевода */}
          <Box className={styles.transferOptions}>
            <Box
              component="button"
              type="button"
              className={styles.option}
              onClick={handleTransferBetweenAccounts}
            >
              <AccountBalanceIcon sx={{ fill: "#868686" }} />
              <Box>
                <p>Между своими счетами</p>
              </Box>
            </Box>
            <Box className={styles.option} onClick={() => navigate("/card-transfer")}>
              <CreditCardIcon sx={{ fill: "#868686" }} />
              <Box>
                <p>На карту</p>
                <span>Visa, Mastercard, МИР</span>
              </Box>
            </Box>
            <Box className={styles.option} onClick={() => navigate("/bank-transfer")}>
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
      <CurrencySelectModal
        open={isCurrencyOpen}
        selectedCode={currency}
        onClose={() => setIsCurrencyOpen(false)}
        onConfirm={(code) => {
          setCurrency(code);
          setIsCurrencyOpen(false);
        }}
      />
    </Container>
  );
}
