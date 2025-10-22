import { toast, type ToastOptions, type TypeOptions } from 'react-toastify';
import './Toast.scss';

const Toast = (title: string, type: TypeOptions, body: string) => {
  const toastObject: ToastOptions = {
    position: "top-right",
    // autoClose: 3000,
    hideProgressBar: true,
    // closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    type: type,
    closeButton: false,
    className: `Toastify__toast-theme--colored.Toastify__toast--${type}`,
  };

  const Message = () => {
    return (
      <div className={type === 'success' ? 'toast-success' : 'toast-error'}>
        <div className='toast-title'>{title}</div>
        <div className='toast-body'>{body}</div>
      </div>
    )
  }

  toast(<Message />, toastObject);
}

export default Toast;