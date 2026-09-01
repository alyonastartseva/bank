import { Box, Typography } from "@mui/material";
import CardComponent from "@/widgets/card/CardComponent";
import { cardMock } from "@/widgets/card/cardMock";
import LockIcon from "@mui/icons-material/Lock";
import { useChangePin } from "../../hooks/useChangePin";
import styles from "./ChangePinForm.module.css";

const ChangePinForm = () => {
  const {
    currentPin,
    setCurrentPin,
    newPin,
    setNewPin,
    confirmPin,
    setConfirmPin,
    error,
    success,
    isLoading,
    handleSubmit,
  } = useChangePin();

  return (
    <div className={styles.container}>
      {success && <div className={styles.successMessage}>{success}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}

      <Typography
        variant="h5"
        sx={{ fontWeight: 600, color: "var(--color-text-primary)", mb: 3, pl: 4 }}
      >
        Изменение PIN-кода
      </Typography>

      <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
  <CardComponent card={cardMock} variant="default" />
</Box>

      {/* 1. Текущий PIN */}
      <Box className={styles.fieldWrapper} sx={{ mt: 4 }}>
        <Box className={styles.labelWithCircle}>
          <span className={styles.circle}>1</span>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              fontFamily: "'Poppins', sans-serif",
              color: "var(--color-text-primary)",
            }}
          >
            Введите текущий PIN-код
          </Typography>
        </Box>
        <Box className={styles.pinContainer}>
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              type="password"
              maxLength={1}
              value={currentPin[i] || ""}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d$/.test(val) || val === "") {
                  const newPinArr = currentPin.split("");
                  newPinArr[i] = val;
                  setCurrentPin(newPinArr.join(""));
                  if (i < 3 && val !== "") {
                    const next = document.querySelector(
                      `input[data-index="${i + 1}"]`
                    ) as HTMLInputElement;
                    if (next) next.focus();
                  }
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !currentPin[i] && i > 0) {
                  const prev = document.querySelector(
                    `input[data-index="${i - 1}"]`
                  ) as HTMLInputElement;
                  if (prev) prev.focus();
                }
              }}
              data-index={i}
              className={styles.pinInput}
              placeholder="•"
            />
          ))}
        </Box>
      </Box>

      {/* 2. Новый PIN */}
      <Box className={styles.fieldWrapper}>
        <Box className={styles.labelWithCircle}>
          <span className={styles.circle}>2</span>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              fontFamily: "'Poppins', sans-serif",
              color: "var(--color-text-primary)",
            }}
          >
            Введите новый PIN-код
          </Typography>
        </Box>
        <Box className={styles.pinContainer}>
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              type="password"
              maxLength={1}
              value={newPin[i] || ""}
             onChange={(e) => {
  const val = e.target.value;
  if (/^\d$/.test(val) || val === "") {
    const newPinArr = newPin.split("");
    newPinArr[i] = val;
    setNewPin(newPinArr.join(""));
    if (i < 3 && val !== "") {
      const next = document.querySelector(
        `input[data-index="${i + 4 + 1}"]`
      ) as HTMLInputElement;
      if (next) next.focus();
    }
  }
}}
onKeyDown={(e) => {
  if (e.key === "Backspace" && !newPin[i] && i > 0) {
    const prev = document.querySelector(
      `input[data-index="${i + 4 - 1}"]`
    ) as HTMLInputElement;
    if (prev) prev.focus();
  }
}}
              data-index={i + 4}
              className={styles.pinInput}
              placeholder="•"
            />
          ))}
        </Box>
        <Typography
          variant="caption"
          sx={{ mt: 0.5, color: "var(--color-text-secondary)" }}
        >
          PIN-код должен состоять из 4 цифр
        </Typography>
      </Box>

      {/* 3. Повторите новый PIN */}
      <Box className={styles.fieldWrapper}>
        <Box className={styles.labelWithCircle}>
          <span className={styles.circle}>3</span>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              fontSize: "16px",
              fontFamily: "'Poppins', sans-serif",
              color: "var(--color-text-primary)",
            }}
          >
            Повторите новый PIN-код
          </Typography>
        </Box>
        <Box className={styles.pinContainer}>
          {[0, 1, 2, 3].map((i) => (
            <input
              key={i}
              type="password"
              maxLength={1}
              value={confirmPin[i] || ""}
              onChange={(e) => {
  const val = e.target.value;
  if (/^\d$/.test(val) || val === "") {
    const newPinArr = confirmPin.split("");
    newPinArr[i] = val;
    setConfirmPin(newPinArr.join(""));
    if (i < 3 && val !== "") {
      const next = document.querySelector(
        `input[data-index="${i + 8 + 1}"]`
      ) as HTMLInputElement;
      if (next) next.focus();
    }
  }
}}
onKeyDown={(e) => {
  if (e.key === "Backspace" && !confirmPin[i] && i > 0) {
    const prev = document.querySelector(
      `input[data-index="${i + 8 - 1}"]`
    ) as HTMLInputElement;
    if (prev) prev.focus();
  }
}}
              data-index={i + 8}
              className={styles.pinInput}
              placeholder="•"
            />
          ))}
        </Box>
      </Box>

      {/* Текст безопасности */}
      <Box className={styles.securityWrapper}>
        <Box className={styles.securityLabel}>
          <span className={styles.securityCircle}>
            <LockIcon sx={{ fontSize: 16, color: "white" }} />
          </span>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: "var(--color-text-primary)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
            }}
          >
            Для вашей безопасности
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "var(--color-text-secondary)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            mt: 0.5,
             ml: "32px",
          }}
        >
          Не используйте простые комбинации, такие как 1234, 0000 или дату рождения.
        </Typography>
      </Box>

      <button
        className={styles.button}
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Сохранение..." : "Сохранить новый PIN-код"}
      </button>
    </div>
  );
};

export default ChangePinForm;