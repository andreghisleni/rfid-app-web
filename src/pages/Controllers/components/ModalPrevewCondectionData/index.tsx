import React, { useEffect, useRef } from 'react';

import { FormHandles } from '@unform/core';

import { Form } from './styles';
import Modal from '../../../../components/Modal';
import { Input } from '../../../../components/Inputs';

interface IModalProps {
  isOpen: boolean;
  data: {
    name: string;
    pass: string;
    key: string;
  };
  setIsOpen: () => void;
}

const ModalPrevewCondectionData: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  data,
}) => {
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    formRef.current?.setData(data);
  }, [data]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={() => ({})} initialData={data}>
        <h2>Dados conecção</h2>

        <div className="row">
          <Input
            name="key"
            label="Key"
            dark={false}
            border={false}
            copy
            disabled
          />
        </div>
        <div className="row">
          <Input
            name="pass"
            label="Password"
            dark={false}
            border={false}
            copy
            disabled
          />
        </div>
      </Form>
    </Modal>
  );
};

export default ModalPrevewCondectionData;
