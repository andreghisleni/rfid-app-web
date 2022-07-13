import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../../../../components/Modal';

import { IAddData, IUpdateData } from '../..';

import { Input } from '../../../../components/Inputs';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAdd: (data: IAddData, formRef: React.RefObject<FormHandles>) => void;
}

const ModalAdd: React.FC<IModalProps> = ({ isOpen, setIsOpen, handleAdd }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (d: IUpdateData) => {
      handleAdd(d, formRef);
    },
    [handleAdd],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={{}}>
        <h1>Alterar Controladora</h1>
        <Input
          name="name"
          placeholder="Informe o nome da controladora"
          label="Nome da controladora"
          dark={false}
          border={false}
        />
        <button type="submit">
          <p className="text">Alterar Cliente</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
