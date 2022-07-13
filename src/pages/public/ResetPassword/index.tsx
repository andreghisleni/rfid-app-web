import React, { useRef, useCallback } from 'react';

import { FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { useHistory, useLocation } from 'react-router-dom';

import zxcvbn from 'zxcvbn';
import { Helmet } from 'react-helmet';
import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';

import { Input, Password } from '../../../components/Inputs';
import Button from '../../../components/Button';

import logoImg from '../../../assets/logo.svg';

import { Container, Content, AnimationContainer } from './styles';
import { useToast } from '../../../hooks/toast';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}
const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit: SubmitHandler<ResetPasswordFormData> = useCallback(
    async (data): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          password: Yup.string()
            .min(6, 'No minimo 6 digitos')
            .test(
              'Erro de validação',
              'Senha muito fraca, utilize símbolos, números e letras maiusculas e minusculas',
              value => {
                if (value === null || value === undefined) return false;
                const f = zxcvbn(value).score;

                return f > 1;
              },
            ),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });
        await schema.validate(data, { abortEarly: false });

        formRef.current?.setErrors({});

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
        });
      }
    },
    [addToast, history, location],
  );
  return (
    <Container>
      <Helmet>
        <title>Resetar Senha - Desbravatec Admin</title>
      </Helmet>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber Logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Password
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
            />

            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ResetPassword;
