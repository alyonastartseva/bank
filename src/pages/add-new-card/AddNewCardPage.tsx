import { Box } from "@mui/material";
import CardComponent from "@/widgets/card/CardComponent";
import { AddCardForm } from "@/features/add-card";
import { cardMock } from "@/widgets/card/cardMock";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import styles from "./AddNewCardPage.module.css";

const AddNewCardPage = () => {
  
  return (
    <Box className={styles.page}>
      <DecorativeEllipse />
      
      <Box className={styles.container}>
        <div className={styles.stack}>
          <CardComponent card={cardMock}/>
          <AddCardForm />
        </div>
      </Box>
    </Box>
  );
};

export default AddNewCardPage;
