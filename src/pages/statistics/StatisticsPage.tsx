import StatisticChart from "@/entities/statisticChart/StatisticChart";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import IconButton from "@mui/material/IconButton";
import styles from "./StatisticsPage.module.css";
import { useTranslation } from 'react-i18next';



export default function StatisticsPage() {
  const { t } = useTranslation();

  return (
    <Box className={styles.page}>
      <Container className={styles.container}>
        <div className={styles.stack}>
          <Box className={styles.header}>
            <IconButton className={styles.iconBtn}>
              <ArrowBackIosIcon fontSize="small" className={styles.backIcon} />
            </IconButton>

            <Typography className={styles.title}>{t('statistics.title')}</Typography>

            <IconButton className={styles.iconBtn}>
              <NotificationsNoneIcon className={styles.notifIcon} />
            </IconButton>
          </Box>

          <StatisticChart />
        </div>
      </Container>
    </Box>
  );
}
