export interface sweetAlertProps {
  confirm: () => void;
  cancle: () => void;
  title: string;
  subtitle: string;
  type: "success" | "error" | "warning" | "info" | undefined;
  confirmBtnText: string;
  confirmBtnBsStyle: string;
}
