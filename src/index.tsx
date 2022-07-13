import React from 'react';
import ReactDOM from 'react-dom';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './App';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: `https://${process.env.SENTRY_KEY}.ingest.sentry.io/${process.env.SENTRY_PROJECT}`,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(<App />, document.getElementById('root'));
