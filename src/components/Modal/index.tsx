import React, { useState, useEffect, useCallback } from 'react';
import { animated, useTransition } from 'react-spring';
import { Container } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);
  const transitionContainer = useTransition(modalStatus, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  const transitionModal = useTransition(modalStatus, {
    from: {
      opacity: 0,
      y: -100,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
    leave: {
      opacity: 0,
      y: -100,
    },
  });

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  const handleToggleModal = useCallback(() => {
    modalStatus && setIsOpen();
  }, [modalStatus, setIsOpen]);

  return (
    <>
      {transitionContainer(
        (style, item) =>
          item && (
            <Container style={style}>
              <div className="close" onClick={handleToggleModal} />
              {transitionModal(
                (style2, item2) =>
                  item2 && (
                    <animated.div className="modal" style={style2}>
                      {children}
                    </animated.div>
                  ),
              )}
            </Container>
          ),
      )}
    </>
  );
};

export default Modal;
