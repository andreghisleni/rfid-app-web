import React, { useEffect } from 'react';

import {
  FiAlertCircle,
  FiXCircle,
  FiInfo,
  FiCheckCircle,
  FiCopy,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  toast: ToastMessage;
  style: object;
}
const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
  copied: <FiCopy size={24} />,
};
const Toast: React.FC<ToastProps> = ({ toast, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.time || 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, toast.id, toast.time]);
  return (
    <Container
      hasDescription={!!toast.description}
      type={toast.type}
      style={style}
    >
      {icons[toast.type || 'info']}
      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>
      <button onClick={() => removeToast(toast.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;
