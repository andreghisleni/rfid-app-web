import React from 'react';

import { Helmet } from 'react-helmet';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>DashBoad - Desbravatec Admin</title>
      </Helmet>
      Dashboard
    </Container>
  );
};

export default Dashboard;
