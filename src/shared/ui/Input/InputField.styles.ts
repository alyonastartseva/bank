import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiInput-root": {
    marginTop: "24px",
    paddingLeft: 0,
    paddingRight: 0,
  },
  "& .MuiInputBase-adornedStart": {
    paddingLeft: 0,
    paddingRight: 0,
  },
  // Нижняя граница (обычное состояние)
  "& .MuiInput-underline:before": {
    borderBottomColor: "var(--color-footer-bg)",
    borderBottomWidth: "2px",
  },
  // Нижняя граница при наведении
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "var(--color-text-secondary)",
    borderBottomWidth: "2px",
  },
  // Нижняя граница в фокусе
  "& .MuiInput-underline:after": {
    borderBottomColor: "var(--color-primary)",
    borderBottomWidth: "2px",
  },
  // Нижняя граница при ошибке
  "& .MuiInput-underline.Mui-error:after": {
    borderBottomColor: "var(--color-error)",
  },
  // Стили самого инпута
  "& .MuiInput-input": {
    fontSize: "18px",
    padding: "8px 0",
    color: "var(--color-text-primary)",
  },
  // Плейсхолдер
  "& .MuiInput-input::placeholder": {
    color: "var(--color-text-muted)",
    opacity: 1,
  },
  // Стили для адаптеров иконок (прижимаем к краям)
  "& .MuiInputAdornment-root": {
    margin: 0,
  },
  "& .MuiInputAdornment-positionStart": {
    marginRight: "16px",
  },
  "& .MuiInputAdornment-positionEnd": {
    marginLeft: "16px",
  },
  // Стили лейбла
  "& .MuiInputLabel-root": {
    color: "var(--color-text-secondary)",
    fontSize: "20px",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--color-text-primary)",
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "var(--color-error)",
  },
  // Стили вспомогательного текста
  "& .MuiFormHelperText-root": {
    fontSize: "12px",
  },
  "&.readOnly": {
  "& .MuiInput-underline:after": {
    borderBottomColor: "transparent",
  },

  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "#F4F4F4",
  },
},
}));
