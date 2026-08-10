import { useMemo, useState } from "react";
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  TextField,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useTranslation } from "react-i18next";

import { currencies } from "@/entities/currency";
import type { CurrencyCode } from "@/entities/currency";
import styles from "./CurrencySelectModal.module.css";

type Props = {
  open: boolean;
  selectedCode: CurrencyCode;
  onClose: () => void;
  onConfirm: (code: CurrencyCode) => void;
};

type ContentProps = {
  selectedCode: CurrencyCode;
  onClose: () => void;
  onConfirm: (code: CurrencyCode) => void;
};

function CurrencySelectContent({ selectedCode, onClose, onConfirm }: ContentProps) {
  const { t } = useTranslation();
  const [draftCode, setDraftCode] = useState<CurrencyCode>(selectedCode);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return currencies;

    return currencies.filter((item) => {
      const name = t(item.nameKey).toLowerCase();
      return item.code.toLowerCase().includes(q) || name.includes(q);
    });
  }, [search, t]);

  return (
    <Box className={styles.content}>
      <Box className={styles.header}>
        <IconButton size="small" className={styles.backBtn} onClick={onClose}>
          <ArrowBackIosNewRoundedIcon fontSize="small" />
        </IconButton>
        <Typography className={styles.title}>{t("selectCurrency.title")}</Typography>
      </Box>

      <TextField
        fullWidth
        placeholder={t("selectCurrency.searchPlaceholder")}
        variant="outlined"
        size="small"
        className={styles.search}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
        {filtered.map((item) => {
          const isSelected = item.code === draftCode;

          return (
            <ListItemButton
              key={item.code}
              className={styles.row}
              onClick={() => setDraftCode(item.code)}
            >
              <ListItemAvatar>
                <Avatar src={item.flagUrl} className={styles.flag} />
              </ListItemAvatar>

              <ListItemText
                primary={item.code}
                secondary={t(item.nameKey)}
                primaryTypographyProps={{ className: styles.code }}
                secondaryTypographyProps={{ className: styles.name }}
              />

              {isSelected ? (
                <CheckCircleRoundedIcon className={styles.check} />
              ) : (
                <span className={styles.radioEmpty} />
              )}
            </ListItemButton>
          );
        })}
      </List>

      <button
        type="button"
        className={styles.doneBtn}
        onClick={() => onConfirm(draftCode)}
      >
        {t("selectCurrency.done")}
      </button>
    </Box>
  );
}

export function CurrencySelectModal({
  open,
  selectedCode,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onClose={onClose} className={styles.dialog} fullWidth>
      {open && (
        <CurrencySelectContent
          key={selectedCode}
          selectedCode={selectedCode}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      )}
    </Dialog>
  );
}
