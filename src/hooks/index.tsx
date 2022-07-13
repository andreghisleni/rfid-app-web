import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { HeaderProvider } from './header';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <HeaderProvider>
      <ToastProvider>{children}</ToastProvider>
    </HeaderProvider>
  </AuthProvider>
);

export default AppProvider;
