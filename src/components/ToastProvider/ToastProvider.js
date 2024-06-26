import React from "react";
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function addToast({ message, variant }) {
    const id = Math.random();
    const newToast = { id, message, variant };
    setToasts([...toasts, newToast]);
  }

  function removeToastById(id) {
    try {
      if (!id) {
        throw new Error("No ID provided!");
      }
      const index = toasts.findIndex((toast) => toast.id === id);
      if (index == null) {
        throw new Error("No index found for provided ID!");
      }
      const newToasts = toasts.slice(); // shallow copy because we don't change inner data
      newToasts.splice(index, 1);
      setToasts(newToasts);
    } catch (err) {
      console.warn(err);
    }
  }

  useKeyboardShortcut(() => {
    setToasts([]);
  }, "Escape");

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToastById,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
