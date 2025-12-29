import { toast, Bounce } from "react-toastify";

const base = {
  position: "bottom-right",
  autoClose: 4500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  transition: Bounce,
};

export const appToast = {
  success(message, opts = {}) {
    return toast.success(message, { ...base, ...opts });
  },
  error(message, opts = {}) {
    return toast.error(message, { ...base, ...opts });
  },
  info(message, opts = {}) {
    return toast.info(message, { ...base, ...opts });
  },
  warn(message, opts = {}) {
    return toast.warn(message, { ...base, ...opts });
  },
};
