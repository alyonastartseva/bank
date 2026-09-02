import { Box, Typography } from "@mui/material";
import CardComponent from "@/widgets/card/CardComponent";
import { cardMock } from "@/widgets/card/cardMock";
import LockIcon from "@mui/icons-material/Lock";
import { useChangePin } from "../../hooks/useChangePin";
import { useRef, useCallback } from "react";
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

  const currentRefs = useRef<(HTMLInputElement | null)[]>([]);
  const newRefs = useRef<(HTMLInputElement | null)[]>([]);
  const confirmRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePinChange = useCallback(
    (
      index: number,
      value: string,
      setter: (val: string) => void,
      pinArray: string,
      refs: React.MutableRefObject<(HTMLInputElement | null)[]>
    ) => {
      if (!/^\d$/.test(value) && value !== "") return;

      const newPin = pinArray.split("");
      newPin[index] = value;
      setter(newPin.join(""));

      if (value && index < 3) {
        refs.current[index + 1]?.focus();
      }
    },
    []
  );

  const handleKeyDown = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number,
      pinArray: string,
      refs: React.MutableRefObject<(HTMLInputElement | null)[]>
    ) => {
      if (e.key === "Backspace" && !pinArray[index] && index > 0) {
        refs.current[index - 1]?.focus();
      }
    },
    []
  );

  const renderInputs = (
  refs: React.RefObject<(HTMLInputElement | null)[]>,
  value: string,
  setter: (val: string) => void
) => {
  return [0, 1, 2, 3].map((i) => (
    <input
      key={i}
      ref={(el) => { refs.current[i] = el; }}
      type="password"
      maxLength={1}
      value={value[i] || ""}
      onChange={(e) =>
        handlePinChange(i, e.target.value, setter, value, refs)
      }
      onKeyDown={(e) => handleKeyDown(e, i, value, refs)}
      className={styles.pinInput}
      placeholder="•"
    />
  ));
};

  return (
    <div className={styles.container}>
      {success && <div className={styles.successMessage}>{success}</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}

      <Typography className={styles.pageTitle}>
        Изменение PIN-кода
      </Typography>

      <Box className={styles.cardWrapper}>
        <CardComponent card={cardMock} variant="default" />
      </Box>

      <div className={styles.fieldWrapper}>
        <div className={styles.labelWithCircle}>
          <span className={styles.circle}>1</span>
          <Typography className={styles.labelText}>
            Введите текущий PIN-код
          </Typography>
        </div>
        <div className={styles.pinContainer}>
          {renderInputs(currentRefs, currentPin, setCurrentPin)}
        </div>
      </div>

      <div className={styles.fieldWrapper}>
        <div className={styles.labelWithCircle}>
          <span className={styles.circle}>2</span>
          <Typography className={styles.labelText}>
            Введите новый PIN-код
          </Typography>
        </div>
        <div className={styles.pinContainer}>
          {renderInputs(newRefs, newPin, setNewPin)}
        </div>
        <Typography className={styles.hintText}>
          PIN-код должен состоять из 4 цифр
        </Typography>
      </div>

      <div className={styles.fieldWrapper}>
        <div className={styles.labelWithCircle}>
          <span className={styles.circle}>3</span>
          <Typography className={styles.labelText}>
            Повторите новый PIN-код
          </Typography>
        </div>
        <div className={styles.pinContainer}>
          {renderInputs(confirmRefs, confirmPin, setConfirmPin)}
        </div>
      </div>

      <div className={styles.securityWrapper}>
        <div className={styles.securityLabel}>
          <span className={styles.securityCircle}>
            <LockIcon sx={{ fontSize: 16, color: "white" }} />
          </span>
          <Typography className={styles.securityTitle}>
            Для вашей безопасности
          </Typography>
        </div>
        <Typography className={styles.securityText}>
          Не используйте простые комбинации, такие как 1234, 0000 или дату
          рождения.
        </Typography>
      </div>

      <button className={styles.button} onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Сохранение..." : "Сохранить новый PIN-код"}
      </button>
    </div>
  );
};

export default ChangePinForm;