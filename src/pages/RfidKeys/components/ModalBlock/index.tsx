import React, { useCallback } from 'react';

import { Container } from './styles';
import Modal from '../../../../components/Modal';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  id?: string;
  handleBlock: (id: string) => void;
}

const ModalBlock: React.FC<IModalProps> = ({
  id,
  isOpen,
  setIsOpen,
  handleBlock: handeleBloc,
}) => {
  const handleCancel = useCallback(() => {
    setIsOpen();
  }, [setIsOpen]);

  const handleBlock = useCallback(() => {
    id && handeleBloc(id);
  }, [handeleBloc, id]);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <h1>Bloquear uid? </h1>
        <div>
          <button type="button" className="cancel" onClick={handleCancel}>
            <p className="text">Cancelar</p>
          </button>
          <button type="button" className="block" onClick={handleBlock}>
            <p className="text">Bloquear</p>
          </button>
        </div>
      </Container>
    </Modal>
  );
};

export default ModalBlock;
