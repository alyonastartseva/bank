import * as React from "react";
import {
  Box,
  IconButton,
  Typography,
  TextField,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import styles from "./LanguagePage.module.css";
import { useTranslation } from "react-i18next";

export enum LangId {
  EN = "en",
  RU = "ru",
  DE = "de",
  JP = "jp",
  FR = "fr",
}
type LangItem = {
  id: LangId;
  label: string;
  flagUrl: string;
};

export default function LanguagePage() {
  const {t, i18n } = useTranslation();

const languages: LangItem[] = [
  { id: LangId.EN, label: t('language.en'), flagUrl: "https://flagcdn.com/w160/us.png" },
  { id: LangId.RU, label: t('language.ru'), flagUrl: "https://flagcdn.com/w160/ru.png" },
  { id: LangId.DE, label: t('language.de'), flagUrl: "https://flagcdn.com/w160/de.png" },
  { id: LangId.JP, label: t('language.jp'), flagUrl: "https://flagcdn.com/w160/jp.png" },
  { id: LangId.FR, label: t('language.fr'), flagUrl: "https://flagcdn.com/w160/fr.png" },
];


  const handleLanguageChange = (langId: LangId) => {
    i18n.changeLanguage(langId);
  };

  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Box className={styles.header}>
          <IconButton size="small" className={styles.backBtn}>
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </IconButton>

          <Typography className={styles.title}>{t('language.title')}</Typography>
        </Box>

        <TextField
          fullWidth
          placeholder={t('language.searchPlaceholder')}
          variant="outlined"
          size="small"
          className={styles.search}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <List className={styles.list}>
          {languages.map((item, idx) => {
            const isSelected = item.id === i18n.language;

            return (
              <React.Fragment key={item.id}>
                <ListItemButton className={styles.row}
                onClick={() => handleLanguageChange(item.id)}
                >
                  <ListItemAvatar>
                    <Avatar src={item.flagUrl} className={styles.flag} />
                  </ListItemAvatar>

                  <ListItemText primary={item.label} className={styles.label} />

                  {isSelected && <CheckCircleRoundedIcon className={styles.check} />}
                </ListItemButton>

                {idx !== languages.length - 1 && <Divider className={styles.divider} />}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
