import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';
import ContainerData from '../components/ContainerData';
import Profile from '../pages/Profile';
import RfidKeys from '../pages/RfidKeys';
import Controllers from '../pages/Controllers';

const AdmRoutes: React.FC = () => {
  return (
    <ContainerData>
      <Switch>
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />
        <Route path="/rfid-access/keys" component={RfidKeys} isPrivate />
        <Route path="/controllers" component={Controllers} isPrivate />
      </Switch>
    </ContainerData>
  );
};

export default AdmRoutes;
