import React, { useCallback, useRef } from 'react';

import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import * as Yup from 'yup';
import zxcvbn from 'zxcvbn';

import { Link, useHistory } from 'react-router-dom';
import { MdPerson } from 'react-icons/md';
import { Helmet } from 'react-helmet';
import api from '../../../services/api';
import logoImg from '../../../assets/logo.svg';

import { Container, Content, AnimationContainer } from './styles';
import { Input, Password } from '../../../components/Inputs';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';

interface FormData {
  name: string;
  email: string;
  user: string;
  phone: string;
  password: string;
  password_confirmation: string;
}
const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<FormData> = useCallback(
    async (data): Promise<void> => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido (example@domin.com.br)'),
          user: Yup.string().required('Usúario obrigatório'),
          phone: Yup.string().required('Telefone obrigatório'),
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

        await api.post('/users', data);
        formRef.current?.reset();

        history.push('/');
        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon na Desbravatec',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );
  return (
    <Container>
      <Helmet>
        <title>Cadastro - Desbravatec Admin</title>
      </Helmet>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber Logo" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={MdPerson} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="user" icon={FiUser} placeholder="Usúario" />
            <Input
              name="phone"
              icon={FiMail}
              placeholder="Telefone (celular)"
            />
            <Password
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Input
              name="password_confirmation"
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft size={20} />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
