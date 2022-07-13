import React, { useRef, useCallback, useEffect } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../../../../components/Modal';

import { IController, IUpdateData } from '../..';

import { Input } from '../../../../components/Inputs';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  data?: IController;
  handleUpdate: (
    id: string,
    data: IUpdateData,
    formRef: React.RefObject<FormHandles>,
  ) => void;
}

const ModalUpdate: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  data = undefined,
  handleUpdate,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (d: IUpdateData) => {
      data && handleUpdate(data.id, d, formRef);
    },
    [data, handleUpdate],
  );
  useEffect(() => {
    if (data)
      setTimeout(() => {
        const { ...rest } = data;
        formRef.current?.setData({
          ...rest,
        });
      }, 1);
  }, [data]);

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

export default ModalUpdate;
