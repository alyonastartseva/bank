import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { AlertProps } from "@mui/material";
import { selectToast, closeToast } from "@/entities/slices/toastSlice";
import { ToastTypeEnum } from "@/shared/types/enums";

function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector(selectToast);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    dispatch(closeToast());
  };

  const getSeverity = (type?: ToastTypeEnum): AlertProps["severity"] => {
    switch (type) {
      case ToastTypeEnum.Success:
        return "success";
      case ToastTypeEnum.Warning:
        return "warning";
      case ToastTypeEnum.Error:
        return "error";
      default:
        return "info";
    }
  };

  return (
    <>
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={getSeverity(toast.type)}
          variant="filled"
          elevation={6}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Toast;
