import React from 'react';
import { ThemeProvider } from 'styled-components';

import { BrowserRouter as Router } from 'react-router-dom';
import { defaultTheme } from './styles/theme';
import GlobalStyles from './styles/globalStyles';
// import Layout from './components/Layout';
import Routes from './routes/index';
import AppProvider from './hooks/index';

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <AppProvider>
            <Routes />
          </AppProvider>
          <GlobalStyles />
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
