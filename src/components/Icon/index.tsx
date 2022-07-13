import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  icon?: IconType;
}

const Icon: React.FC<Props> = ({ icon: Ic }) => {
  return Ic ? <Ic /> : <></>;
};

export default Icon;
