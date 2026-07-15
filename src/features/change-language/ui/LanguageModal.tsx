import {
    Dialog,
    DialogTitle,
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Divider,
  } from "@mui/material";
  import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
  import { useTranslation } from "react-i18next";
  import { useChangeLanguage } from "../hooks/useChangeLanguage";
  import type { LanguageCode } from "@/shared/config/languages";
  interface LanguageModalProps {
    open: boolean;
    onClose: () => void;
  }
  export const LanguageModal = ({ open, onClose }: LanguageModalProps) => {
    const { t } = useTranslation();
    const { languages, currentLanguage, changeLanguage } = useChangeLanguage();
    const handleSelect = (langId: LanguageCode) => {
      changeLanguage(langId);
      onClose();
    };
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>{t("language.title")}</DialogTitle>
        <List>
          {languages.map((item, idx) => {
            const isSelected = item.id === currentLanguage;
            return (
              <div key={item.id}>
                <ListItemButton onClick={() => handleSelect(item.id)}>
                  <ListItemAvatar>
                    <Avatar src={item.flagUrl} />
                  </ListItemAvatar>
                  <ListItemText primary={item.label} />
                  {isSelected && <CheckCircleRoundedIcon color="primary" />}
                </ListItemButton>
                {idx !== languages.length - 1 && <Divider />}
              </div>
            );
          })}
        </List>
      </Dialog>
    );
  };