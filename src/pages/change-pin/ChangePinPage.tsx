import { Box } from "@mui/material";
import ChangePinForm from "@/features/change-pin/ui/ChangePinForm/ChangePinForm";
import styles from "./ChangePinPage.module.css";

const ChangePinPage = () => {
  return (
    <Box className={styles.page}>
      <ChangePinForm />
    </Box>
  );
};

export default ChangePinPage;

