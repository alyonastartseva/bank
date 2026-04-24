import { Box } from "@mui/material";
import CardComponent from "@/widgets/card/CardComponent";
import { AddCardForm } from "@/features/add-card";
import { cardMock } from "@/widgets/card/cardMock";
import { DecorativeEllipse } from "@/shared/ui/decorative-ellipse/DecorativeEllipse";
import layoutStyles from "@/shared/styles/pageLayout.module.css";

const AddNewCardPage = () => {
  return (
    <Box className={layoutStyles.page}>
      <DecorativeEllipse />
      <Box className={layoutStyles.container}>
        <div className={layoutStyles.stack}>
          <CardComponent card={cardMock} />
          <AddCardForm />
        </div>
      </Box>
    </Box>
  );
};

export default AddNewCardPage;