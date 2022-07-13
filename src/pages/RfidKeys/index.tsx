import React, { useState, useCallback, useEffect } from 'react';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { MdBlock } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Container } from './styles';
import Table from '../../components/Table';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

import ModalAdd from './components/ModalAdd';
import ModalBlock from './components/ModalBlock';

export interface IRfidKey {
  id: string;
  name: string;
  uid: string;
  blocked: boolean;
}

interface IRfidLog {
  id: string;
  blocked_access: boolean;
  why: string;
  created_at: string;
  rfid_access_key: {
    name: string;
  };
}

interface IRfidKeyTable {
  [key: string]: string;
}

export type ICreateData = Omit<IRfidKey, 'id' | 'uid' | 'blocked'>;

interface IHandleAdd {
  data: ICreateData;
  formRef: React.RefObject<FormHandles>;
}

const RfidKeys: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalBlockOpen, setModalBlockOpen] = useState(false);
  const [rfidKeys, setRfidKeys] = useState<IRfidKeyTable[]>([]);
  const [blockId, setBlockId] = useState<string>();

  const [rfidLogs, setRfidLogs] = useState<IRfidKeyTable[]>([]);

  const { addToast } = useToast();

  const getRfidKeys = useCallback(async () => {
    api.get<IRfidKey[]>('/rfid-access-key').then(response => {
      setRfidKeys(
        response.data.map(({ blocked, ...data }) => ({
          ...data,
          blocked: blocked ? 'Bloqueado' : 'Não bloqueado',
        })),
      );
    });
  }, []);

  const getRfidLogs = useCallback(async () => {
    api.get<IRfidLog[]>('/rfid-access-log').then(response => {
      setRfidLogs(
        response.data.map(
          ({ blocked_access, created_at, rfid_access_key, ...data }) => ({
            ...data,
            blocked_access: blocked_access
              ? 'Acesso Bloqueado'
              : 'Acesso liberado',
            rfid_access_key_name: rfid_access_key.name,
            created_at: format(parseISO(created_at), 'HH:mm:ss dd/MM/yyyy', {
              locale: ptBR,
            }),
          }),
        ),
      );
    });
  }, []);

  useEffect(() => {
    getRfidKeys();
    getRfidLogs();
  }, [getRfidKeys, getRfidLogs]);

  const toggleModal = useCallback((): void => {
    setModalOpen(modalOpenData => !modalOpenData);
  }, []);

  const toggleBlockModal = useCallback((id?: string): void => {
    setBlockId(id);
    setModalBlockOpen(modalOpenData => !modalOpenData);
  }, []);

  const handleOpenBlockModal = useCallback(
    async (id: string) => {
      toggleBlockModal(id);
    },
    [toggleBlockModal],
  );

  const handleBlock = useCallback(
    async (id: string) => {
      await api.patch(`/rfid-access-key/block/${id}`);
      addToast({ type: 'success', title: 'Uid bloqueado com sucesso' });
      toggleBlockModal();
      getRfidKeys();
    },
    [getRfidKeys, addToast, toggleBlockModal],
  );

  const handleAdd = useCallback(
    async ({ data, formRef }: IHandleAdd): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('/rfid-access-key', data);

        formRef.current?.setErrors({});

        getRfidKeys();

        addToast({
          type: 'success',
          title: 'Uid cadastrado com sucesso',
          description: 'Para completar o processo passe a tag no leitor',
          time: 5000,
        });

        formRef.current?.reset();
        toggleModal();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao cadastrar RfidKey',
          description: 'Ocorreu um erro ao cadastrar o RfidKey',
        });
        // eslint-disable-next-line
        console.log(err);
      }
    },
    [toggleModal, addToast, getRfidKeys],
  );

  return (
    <>
      <ModalBlock
        id={blockId}
        isOpen={modalBlockOpen}
        setIsOpen={toggleBlockModal}
        handleBlock={id => {
          handleBlock(id);
        }}
      />
      <ModalAdd
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAdd={(RfidKey, formRef) => {
          handleAdd({ data: RfidKey, formRef });
        }}
      />

      <Container>
        <Table
          title="Uid Keys"
          label={[
            { name: ['Nome'] },
            { name: ['Uid'] },
            { name: ['Bloqueado'] },
            { name: [''], operator: true, width: 200 },
          ]}
          itens={[
            { name: ['name'] },
            { name: ['uid'] },
            { name: ['blocked'] },
            { name: ['block'], operator: true, type: 'button' },
          ]}
          buttons={{
            others: {
              block: {
                color: '#962202',
                icon: MdBlock,
                func: (id: string) => {
                  handleOpenBlockModal(id);
                },
              },
            },
          }}
          keyTable="id"
          data={[...rfidKeys]}
          addFunction={() => {
            toggleModal();
          }}
        />
      </Container>

      <Container>
        <Table
          title="Rfid Access Logs"
          label={[
            { name: ['Nome da uid'] },
            { name: ['Data'] },
            { name: ['Acesso'] },
          ]}
          itens={[
            { name: ['rfid_access_key_name'] },
            { name: ['created_at'] },
            { name: ['blocked_access'] },
          ]}
          buttons={{}}
          keyTable="id"
          data={[...rfidLogs]}
        />
      </Container>
    </>
  );
};

export default RfidKeys;
