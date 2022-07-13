import React from 'react';

import { Container, Content } from './styles';

interface ICard {
  title: string;
}
const Card: React.FC<ICard> = ({ title, children }) => {
  return (
    <Container>
      <header>{title}</header>
      <Content>{children}</Content>
    </Container>
  );
};

export default Card;
