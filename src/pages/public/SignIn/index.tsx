import React, { useRef, useCallback } from 'react';

import { FiMail, FiLock } from 'react-icons/fi';

import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';

import * as Yup from 'yup';

import { Link, useHistory } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import getValidationErrors from '../../../utils/getValidationErrors';

import { Input } from '../../../components/Inputs';
import Button from '../../../components/Button';

import logoImg from '../../../assets/logo.svg';

import { Container, Content, AnimationContainer } from './styles';
import { useToast } from '../../../hooks/toast';
import { useAuth } from '../../../hooks/auth';

interface FormData {
  user: string;
  password: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async (data): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          user: Yup.string().required('Usúario / E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });

        formRef.current?.setErrors({});
        await signIn({
          user: data.user,
          password: data.password,
        });
        history.push('/');

        addToast({
          type: 'success',
          title: 'Logado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
        // eslint-disable-next-line
        console.log(err);
      }
    },
    [addToast, history, signIn],
  );
  return (
    <Container>
      <Helmet>
        <title>Login - Iot Platform</title>
      </Helmet>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Desbravatec Logo" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input name="user" icon={FiMail} placeholder="Usúario / E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <Link to="forgot-password">Esqueci minha senha</Link>
          </Form>

          {/* <Link to="/signup">
            <FiLogIn size={20} />
            Criar conta
          </Link> */}
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
