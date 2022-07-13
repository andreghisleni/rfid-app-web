import React, { useRef, useCallback, useState } from 'react';

import { FiLogIn, FiMail } from 'react-icons/fi';

import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import api from '../../../services/api';

import getValidationErrors from '../../../utils/getValidationErrors';

import { Input } from '../../../components/Inputs';
import Button from '../../../components/Button';

import logoImg from '../../../assets/logo.svg';
import loadingImg from '../../../assets/loading.svg';

import { Container, Content, AnimationContainer, Loading } from './styles';
import { useToast } from '../../../hooks/toast';

interface ForgotPasswordFormData {
  email: string;
}
const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit: SubmitHandler<ForgotPasswordFormData> = useCallback(
    async (data): Promise<void> => {
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido (example@domin.com.br)'),
        });
        await schema.validate(data, { abortEarly: false });

        formRef.current?.setErrors({});

        // Recuperação de senha

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail de recuperação enviado',
          description:
            'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada',
        });

        formRef.current?.reset();
        // history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description:
            'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );
  return (
    <>
      <Container>
        <Helmet>
          <title>Resetar Senha - Desbravatec Admin</title>
        </Helmet>
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="GoBarber Logo" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Recuperar senha</h1>

              <Input name="email" icon={FiMail} placeholder="E-mail" />

              <Button loading={loading} type="submit">
                Recuperar
              </Button>
            </Form>

            <Link to="/">
              <FiLogIn size={20} />
              Voltar ao login
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
      {loading && (
        <Loading>
          <img src={loadingImg} alt="Loading" />
        </Loading>
      )}
    </>
  );
};

export default ForgotPassword;
