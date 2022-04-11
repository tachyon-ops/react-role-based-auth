import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import './index.css';
import { Main } from './Main';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    // BrowserRouter cannot be used with github pages
    <HashRouter>
      <Main />
    </HashRouter>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
