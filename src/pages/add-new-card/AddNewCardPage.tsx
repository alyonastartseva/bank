import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardComponent from "@/widgets/card/CardComponent";
import { AddCardForm, useCardForm } from "@/features/add-card";
import { cardMock } from "@/widgets/card/cardMock";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import layoutStyles from "@/shared/styles/pageLayout.module.css";
import styles from "./AddNewCardPage.module.css";

const AddNewCardPage = () => {
  const { formData, errors, handleChange, submitForm } = useCardForm();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    submitForm((data) => {
      console.log('Card data:', data);
      alert(t('addNewCard.cardAdded'));
    });
  };

  return (
    <>
    <Box className={layoutStyles.page}>
      <Box className={layoutStyles.container}>
        <div className={styles.stack}>
          <div className={styles.cardWrapper}>
            <DecorativeEllipse round/>
            <CardComponent card={cardMock} />
          </div>
          <AddCardForm
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            hideButton={isDesktop}
          />
        </div>
        {isDesktop && (
          <div className={styles.actions}>
            <button
              className={styles.cancelButton}
              onClick={() => navigate(-1)}>
              {t('addNewCard.cancelButton')}
            </button>
            <button
              className={styles.submitButton}
              onClick={() => handleSubmit()}>
              {t('addNewCard.addButton')}
            </button>
          </div>
        )}
      </Box>
    </Box>
    </>
  );
};


export default AddNewCardPage;
