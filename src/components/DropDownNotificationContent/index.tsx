import React from 'react';

import { Container, NotificationItem } from './styles';

interface DropDownNotificationContentops {
  active: boolean;
}
const DropDownNotificationContent: React.FC<DropDownNotificationContentops> = ({
  active,
}) => {
  return (
    <Container className={active ? 'active' : ''}>
      <NotificationItem>
        <h1>Resumo da notificação</h1>
        <p>
          resumo: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Eligendi quod autem inventore, excepturi adipisci, animi numquam
          rerum.
        </p>
      </NotificationItem>
      <NotificationItem>
        <h1>Resumo da notificação</h1>
        <p>
          resumo: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Eligendi quod autem inventore, excepturi adipisci, animi numquam
          rerum.
        </p>
      </NotificationItem>
      <NotificationItem>
        <h1>Resumo da notificação</h1>
        <p>
          resumo: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Eligendi quod autem inventore, excepturi adipisci, animi numquam
          rerum.
        </p>
      </NotificationItem>
    </Container>
  );
};

export default DropDownNotificationContent;
