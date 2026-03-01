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

type LangItem = {
  id: string;
  label: string;
  flagUrl: string;
};

const languages: LangItem[] = [
  { id: "en", label: "English", flagUrl: "https://flagcdn.com/w160/us.png" },
  { id: "ru", label: "Russian", flagUrl: "https://flagcdn.com/w160/ru.png" },
  { id: "de", label: "German", flagUrl: "https://flagcdn.com/w160/de.png" },
  { id: "jp", label: "Japanese", flagUrl: "https://flagcdn.com/w160/jp.png" },
  { id: "fr", label: "French", flagUrl: "https://flagcdn.com/w160/fr.png" },
];

export default function LanguagePage() {
  const selectedId = "en";

  return (
    <>
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Box className={styles.header}>
          <IconButton size="small" className={styles.backBtn}>
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </IconButton>

          <Typography className={styles.title}>Language</Typography>
        </Box>


        <TextField
          fullWidth
          placeholder="Search Language"
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

        <List className={styles.list} >
          {languages.map((item, idx) => {
            const isSelected = item.id === selectedId;

            return (
              <React.Fragment key={item.id}>
                <ListItemButton className={styles.row}>
                  <ListItemAvatar>
                    <Avatar src={item.flagUrl} className={styles.flag} />
                  </ListItemAvatar>

                  <ListItemText primary={item.label} className={styles.label} />

                  {isSelected && (
                    <CheckCircleRoundedIcon className={styles.check} />
                  )}
                </ListItemButton>

                {idx !== languages.length - 1 && (
                  <Divider className={styles.divider} />
                )}
              </React.Fragment>
            );
          })}
        </List>
      </Box>
    </Box>
    </>
  );
}