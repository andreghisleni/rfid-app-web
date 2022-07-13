import React, { useState, useCallback, useEffect } from 'react';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { BsEye } from 'react-icons/bs';
import { Container } from './styles';
import Table from '../../components/Table';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import ModalUpdate from './components/ModalUpdate';
import ModalPrevewCondectionData from './components/ModalPrevewCondectionData';
import ModalAdd from './components/ModalAdd';

export interface IController {
  id: string;
  name: string;
  key: string;
  pass: string;
  created_at: string;
  updated_at: string;
}

interface IClientTable {
  [key: string]: string | number;
}

export type IUpdateData = Omit<IController, 'id'>;

export type IAddData = Omit<IController, 'id'>;

interface IHandleUpdate {
  id: string;
  data: IUpdateData;
  formRef: React.RefObject<FormHandles>;
}

interface IHandleAdd {
  data: IUpdateData;
  formRef: React.RefObject<FormHandles>;
}

const Controllers: React.FC = () => {
  const [modalUpdateOpen, setModalUpdateOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [
    modalPrevewConectionDataOpen,
    setModalPrevewConectionDataOpen,
  ] = useState(false);
  const [controllers, setControllers] = useState<IClientTable[]>([]);
  const [updateData, setUpdateData] = useState<IController>();
  const [prevewConectionData, setPrevewConectionData] = useState<{
    name: string;
    key: string;
    pass: string;
  }>();

  const { addToast } = useToast();

  const getControllers = useCallback(async () => {
    api.get<IController[]>('/controllers').then(response => {
      setControllers(
        response.data.map(({ ...data }) => ({
          ...data,
        })),
      );
    });
  }, []);

  useEffect(() => {
    getControllers();
  }, [getControllers]);

  const toggleUpdateModal = useCallback((data?: IController): void => {
    setUpdateData(data);
    setModalUpdateOpen(modalOpenData => !modalOpenData);
  }, []);

  const togglePrevewConectionDataModal = useCallback(
    (data?: { name: string; pass: string; key: string }): void => {
      setPrevewConectionData(data);
      setModalPrevewConectionDataOpen(modalOpenData => !modalOpenData);
    },
    [],
  );

  const toggleAddModal = useCallback((): void => {
    setModalAddOpen(modalOpenData => !modalOpenData);
  }, []);

  // const handleOpenUpdateModal = useCallback(
  //   (data: IController) => {
  //     toggleUpdateModal(data);
  //   },
  //   [toggleUpdateModal],
  // );

  const handleOpenAddModal = useCallback(() => {
    toggleAddModal();
  }, [toggleAddModal]);

  const handleUpdate = useCallback(
    async ({ id, data, formRef }: IHandleUpdate): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post(`/controllers/${id}`, data);

        formRef.current?.setErrors({});

        getControllers();

        addToast({
          type: 'success',
          title: 'Controladora atualizada com sucesso',
        });

        formRef.current?.reset();
        toggleUpdateModal();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao atualizar controladora',
          description: 'Ocorreu um erro ao atualizar a controladora',
        });
        // eslint-disable-next-line
        console.log(err);
      }
    },
    [toggleUpdateModal, addToast, getControllers],
  );

  const handleAdd = useCallback(
    async ({ data, formRef }: IHandleAdd): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post(`/controllers`, data);

        formRef.current?.setErrors({});

        getControllers();

        addToast({
          type: 'success',
          title: 'Controladora cadastrada com sucesso',
        });

        formRef.current?.reset();
        toggleAddModal();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar controladora',
          description: 'Ocorreu um erro ao cadastrar a controladora',
        });
        // eslint-disable-next-line
        console.log(err);
      }
    },
    [toggleAddModal, addToast, getControllers],
  );

  return (
    <>
      <ModalPrevewCondectionData
        isOpen={modalPrevewConectionDataOpen}
        setIsOpen={togglePrevewConectionDataModal}
        data={prevewConectionData || { name: '', pass: '', key: '' }}
      />
      <ModalUpdate
        isOpen={modalUpdateOpen}
        setIsOpen={toggleUpdateModal}
        data={updateData}
        handleUpdate={(id, data, formRef) => {
          handleUpdate({ id, data, formRef });
        }}
      />
      <ModalAdd
        isOpen={modalAddOpen}
        setIsOpen={toggleAddModal}
        handleAdd={(data, formRef) => {
          handleAdd({ data, formRef });
        }}
      />
      <Container>
        <Table
          title="Controladoras"
          label={[
            { name: ['Nome'] },
            { name: ['Dados conecção'], width: 184 },
            { name: [''], operator: true, width: 200 },
          ]}
          itens={[
            { name: ['name'] },
            { name: ['dc'], type: 'button' },
            { name: [''], operator: true },
          ]}
          addFunction={handleOpenAddModal}
          buttons={{
            // edit: (_: string, data: IController) => {
            //   handleOpenUpdateModal(data);
            // },
            others: {
              dc: {
                label: 'Dados Conecção',
                icon: BsEye,
                func: (id: string, { name, pass, key }: IController) => {
                  togglePrevewConectionDataModal({
                    name,
                    pass,
                    key,
                  });
                },
              },
            },
          }}
          keyTable="id"
          data={[...controllers]}
        />
      </Container>
    </>
  );
};

export default Controllers;
