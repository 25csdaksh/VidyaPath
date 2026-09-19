import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = 'info', title, message, duration = 4500 }) => {
      const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const newToast = { id, type, title, message };
      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast]
  );

  const toast = {
    success: (message, title = 'Success') => addToast({ type: 'success', title, message }),
    error: (message, title = 'Error') => addToast({ type: 'error', title, message }),
    warning: (message, title = 'Warning') => addToast({ type: 'warning', title, message }),
    info: (message, title = 'Info') => addToast({ type: 'info', title, message }),
    remove: removeToast,
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={20} color="var(--color-success)" />;
      case 'error':
        return <AlertCircle size={20} color="var(--color-danger)" />;
      case 'warning':
        return <AlertTriangle size={20} color="var(--color-warning)" />;
      default:
        return <Info size={20} color="var(--color-info)" />;
    }
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`} role="alert">
            <div className="toast-icon">{renderIcon(t.type)}</div>
            <div className="toast-content flex-1" style={{ flex: 1 }}>
              {t.title && <div className="toast-title font-semibold text-sm">{t.title}</div>}
              {t.message && <div className="toast-message text-sm text-secondary" style={{ color: 'var(--text-secondary)' }}>{t.message}</div>}
            </div>
            <button
              className="btn btn-ghost btn-sm"
              style={{ padding: '0.2rem', color: 'var(--text-muted)' }}
              onClick={() => removeToast(t.id)}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;
