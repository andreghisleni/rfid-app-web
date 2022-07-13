import React, { useEffect } from 'react';

import { IconType } from 'react-icons';
import { MdPlusOne } from 'react-icons/md';

import { useRouteMatch } from 'react-router-dom';
import { Container } from './styles';
import { useHeader } from '../../../../hooks/header';

interface Props {
  title: string;
  to?: string;
  exact?: boolean;
  icon?: IconType;
}
const Item: React.FC<Props> = ({
  title,
  to = '/#',
  icon: Icon = MdPlusOne,
  exact = false,
}) => {
  const { setTitle } = useHeader();

  const active = useRouteMatch({
    exact,
    path: to,
  });

  useEffect(() => {
    active && setTitle(title);
  }, [active, setTitle, title]);

  return (
    <>
      <Container className={active ? 'active' : ''} to={to}>
        <div className="bg" />
        <div className="status" />
        <Icon />
        <span>{title}</span>
      </Container>
    </>
  );
};

export default Item;
