import { sweetAlertProps } from "@/typeScript/sweetalert.interface";
import SweetAlert from "react-bootstrap-sweetalert";

const SweetAlertComponent: React.FC<sweetAlertProps> = ({
  confirm,
  cancle,
  title,
  subtitle,
  type,
  confirmBtnText,
  confirmBtnBsStyle,
}) => {
  return (
    <SweetAlert
      type={type}
      showCancel={true}
      confirmBtnText={confirmBtnText}
      confirmBtnBsStyle={confirmBtnBsStyle}
      title={title}
      onConfirm={confirm}
      onCancel={cancle}
      focusCancelBtn
    >
    </SweetAlert>
  );
};

export default SweetAlertComponent;
