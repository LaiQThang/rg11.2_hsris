import { toast } from 'react-toastify';
import './Toast.css'
import 'react-toastify/dist/ReactToastify.css';

export  const showToast = (appearance, message) => {
  toast[appearance](message, {
    autoClose: 3000,
    hideProgressBar: true,
    closeButton: true,
    position: toast.POSITION.TOP_RIGHT,
    className: 'custom-toast-container',
    bodyClassName: `custom-toast-body ${appearance}`,
  });
};