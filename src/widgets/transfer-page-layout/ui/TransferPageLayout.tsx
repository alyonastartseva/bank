import { useNavigate } from "react-router-dom";
import { Box, Container, IconButton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./TransferPageLayout.module.css";
import swiperStyles from "@/shared/styles/swiper.module.css";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import CardComponent from "@/widgets/card/CardComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { transferCards } from "@/shared/constants/transferCards";

type TransferPageLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function TransferPageLayout({
  title,
  subtitle,
  children,
}: TransferPageLayoutProps) {
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
              {transferCards.map((card) => (
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

            <div className={styles.titleGroup}>
              <h1 className={styles.pageTitle}>{title}</h1>

              {subtitle && <span className={styles.pageSubtitle}>{subtitle}</span>}
            </div>
          </div>

          {children}
        </Box>
      </Box>
    </Container>
  );
}
