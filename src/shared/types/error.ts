export interface ToastMessage {
  type: "success" | "info" | "warning" | "error";
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
