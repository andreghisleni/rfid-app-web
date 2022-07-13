import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../../../../components/Modal';
import { Input } from '../../../../components/Inputs';

import { ICreateData } from '../..';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAdd: (
    build: ICreateData,
    formRef: React.RefObject<FormHandles>,
  ) => void;
}

const ModalAdd: React.FC<IModalProps> = ({ isOpen, setIsOpen, handleAdd }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateData) => {
      handleAdd(data, formRef);
    },
    [handleAdd],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={{}}>
        <h1>Novo Uid</h1>

        <Input
          name="name"
          placeholder="Informe o nome para a tag uid"
          label="Nome do ciente"
          dark={false}
          border={false}
        />

        <button type="submit">
          <p className="text">Adicionar Tag</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAdd;
