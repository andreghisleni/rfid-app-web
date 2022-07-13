import React from 'react';
import logoImg from '../../../../assets/logo.svg';

import { Container } from './styles';

const Title: React.FC = () => {
  return (
    <Container>
      <div />
      <img src={logoImg} alt="Desbravatec Logo" />
      <span>Desbravatec</span>
    </Container>
  );
};

export default Title;
