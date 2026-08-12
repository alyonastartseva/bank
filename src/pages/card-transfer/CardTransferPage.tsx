import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Container, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./CardTransferPage.module.css";
import swiperStyles from "@/shared/styles/swiper.module.css";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import CardComponent from "@/widgets/card/CardComponent";
import { cardMock } from "@/widgets/card/cardMock";
import type { cardType } from "@/shared/types/cardType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CardTransferForm } from "@/features/card-transfer";

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

export default function CardTransferPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container maxWidth="md" className={styles.pageContainer}>
      <Box className={styles.page}>
        <Box className={layoutStyles.stack}>
          <div className={swiperStyles.swiperWrapper}>
            <Swiper
              className={swiperStyles.cardsSwiper}
              spaceBetween={isDesktop ? 0 : 16}
              slidesPerView={isDesktop ? 1 : 1.15}
              centeredSlides={isDesktop}
              grabCursor
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: `.${swiperStyles.customPrev}`,
                nextEl: `.${swiperStyles.customNext}`,
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

            <div className={swiperStyles.customPrev}></div>
            <div className={swiperStyles.customNext}></div>
          </div>

          <div className={styles.pageHeader}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ width: 42, height: 42, backgroundColor: "var(--color-item-bg)" }}
            >
              <ArrowBackIcon
                sx={{ fill: "var(--color-text-primary)", width: 20, height: 20 }}
              />
            </IconButton>
            <h1 className={styles.pageTitle}>{t("cardTransfer.title")}</h1>
          </div>

          <CardTransferForm />
        </Box>
      </Box>
    </Container>
  );
}
