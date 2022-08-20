import React from 'react';
import ReactDOM from 'react-dom';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './App';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: `https://779104e80f0640c8b8a8621ba53d4fde@o306573.ingest.sentry.io/6671506`,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
