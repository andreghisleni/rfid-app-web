import React from 'react';

import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/public/SignIn';

import ForgotPassword from '../pages/public/ForgotPassword';
import ResetPassword from '../pages/public/ResetPassword';

// import Dashboard from '../pages/Dashboard';
// import Profile from '../pages/Profile/index';
import Layout from '../components/Layout';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      {/* <Route path="/signup" exact component={SignUp} /> */}
      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/reset-password" exact component={ResetPassword} />

      <Route path="/*" component={Layout} isPrivate />
    </Switch>
  );
};

export default Routes;
