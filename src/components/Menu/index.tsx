import React from 'react';

import { AiFillPieChart } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { FaMicrochip } from 'react-icons/fa';
import { FcKey } from 'react-icons/fc';

import { Container } from './styles';

import Item from './components/Item';
import Title from './components/Title';

const Menu: React.FC = () => {
  return (
    <Container>
      <Title />
      <Item title="DashBoard" icon={AiFillPieChart} to="/dashboard" exact />
      <Item
        title="Rfid Access Keys"
        icon={FcKey}
        to="/rfid-access/keys"
        exact
      />
      <Item title="Controladoras" icon={FaMicrochip} to="/controllers" exact />

      <Item title="Perfil" icon={ImProfile} to="/profile" exact />
    </Container>
  );
};

export default Menu;
