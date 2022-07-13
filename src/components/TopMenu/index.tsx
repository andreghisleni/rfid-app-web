import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { MdNotifications } from 'react-icons/md';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  InferiorBord,
  DataContainer,
  RigthContainer,
  NotificationContainer,
  UserInfo,
  DropDownContent,
} from './styles';

import avatarDefaultImg from '../../assets/avatar-default.jpg';
import { useHeader } from '../../hooks/header';
import DropDownNotificationContent from '../DropDownNotificationContent';

const TopMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const { title } = useHeader();
  const [active, setActive] = useState(false);

  return (
    <Container>
      <DataContainer>
        <h1>{title}</h1>

        <RigthContainer>
          <NotificationContainer isNotification={false}>
            <div className="icon" onClick={() => setActive(old => !old)}>
              <MdNotifications />
            </div>
            <DropDownNotificationContent active={active} />
          </NotificationContainer>
          <span className="line" />
          <UserInfo>
            <h2>{user.name}</h2>

            <img
              src={user.avatar_url ? user.avatar_url : avatarDefaultImg}
              alt={user.name}
            />

            <DropDownContent>
              <Link to="profile">Perfil</Link>
              <button type="button" onClick={signOut}>
                Sair
              </button>
            </DropDownContent>
          </UserInfo>
        </RigthContainer>
      </DataContainer>

      <div className="line">
        <InferiorBord />
      </div>
    </Container>
  );
};

export default TopMenu;
