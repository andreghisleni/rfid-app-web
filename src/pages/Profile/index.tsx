import React, { useCallback, useRef, ChangeEvent } from 'react';

import { FormHandles, SubmitHandler } from '@unform/core';

import { Form } from '@unform/web';
import { FiCamera } from 'react-icons/fi';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';

import api from '../../services/api';

import { Container, AvatarInput, Content } from './styles';

import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import Card from '../../components/Card';
import { Input, Password } from '../../components/Inputs';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';// eslint-disable-line


interface ProfileFormData {
  name: string;
  email: string;

  old_password: string;
  password: string;
  password_confirmation: string;
}
const Profile: React.FC = () => {
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);
          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [updateUser, addToast],
  );

  const handleSubmit: SubmitHandler<ProfileFormData> = useCallback(
    async (data): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido (example@domin.com.br)'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().min(6, 'No minimo 6 digitos'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().min(6, 'No minimo 6 digitos'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });
        await schema.validate(data, { abortEarly: false });

        formRef.current?.setErrors({});

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const pass = {
          old_password,
          password,
          password_confirmation,
        };

        const formData = {
          name,
          email,
          ...(old_password ? pass : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);
        formRef.current?.reset();
        formRef.current?.setData(response.data);

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil form atualizadas com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na atualização!',
          description:
            'Ocorreu um erro ao atualizar o seu perfil, tente novamente.',
        });
        // console.log(err);
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <Helmet>
        <title>Perfil - Iot Platform</title>
      </Helmet>
      <Card title="Atualizar Perfil">
        <Form onSubmit={handleSubmit} initialData={user} ref={formRef}>
          <Content>
            <div className="columns">
              <AvatarInput htmlFor="avatar">
                <img src={user.avatar_url} alt={user.name} />
                <label htmlFor="avatar">
                  <FiCamera />
                  <input
                    type="file"
                    id="avatar"
                    onChange={handleAvatarChange}
                  />
                </label>
              </AvatarInput>
            </div>

            <div className="columns">
              <div className="row">
                <Input
                  name="name"
                  label="Nome"
                  placeholder="Seu nome"
                  dark={false}
                />
                <Input
                  name="email"
                  label="E-mail"
                  placeholder="Seu e-mail"
                  dark={false}
                  disabled
                />
                <Input
                  name="user"
                  label="Usuário"
                  placeholder="Seu usuário"
                  dark={false}
                />
              </div>
              <div className="row">
                <Input
                  name="old_password"
                  label="Senha atual"
                  placeholder="Sua senha atual"
                  type="password"
                  dark={false}
                />
                <Input
                  name="passwordUpdateTime"
                  label="Data da última alteração da senha"
                  type="date"
                  disabled
                  dark={false}
                />
              </div>
              <div className="row">
                <Password
                  name="password"
                  label="Nova Senha"
                  placeholder="Sua nova senha"
                  type="password"
                  dark={false}
                />
                <Input
                  name="password_confirmation"
                  label="Confirmar nova senha"
                  placeholder="Confirme sua senha"
                  type="password"
                  dark={false}
                />
              </div>
              <div className="row">
                <Button type="submit">Confirmar mudanças</Button>
              </div>
            </div>
          </Content>
        </Form>
      </Card>
    </Container>
  );
};

export default Profile;
