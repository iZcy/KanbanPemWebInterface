import "./ToasterStyle.css";
import { ToastContainer } from "react-toastify";

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      className="custom-toast-container"
      toastClassName="custom-toast"
    />
  );
};

export default ToastProvider;
