import React from 'react';

import { Container } from './styles';
import Menu from '../Menu';

import AdmRoutes from '../../routes/Adm';
import TopMenu from '../TopMenu';

const Layout: React.FC = () => {
  return (
    <Container>
      <Menu />
      <TopMenu />
      <AdmRoutes />
    </Container>
  );
};

export default Layout;
