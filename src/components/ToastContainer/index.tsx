import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '../../hooks/toast';

import Toast from './Toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}
const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
  });
  return (
    <Container>
      {messagesWithTransitions((props, item) => (
        <Toast toast={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
