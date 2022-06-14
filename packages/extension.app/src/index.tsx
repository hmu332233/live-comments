import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';

import './global.css';
import App from './App';

const container = document.getElementById('app');
const { props } = JSON.parse(
  document.getElementById('__LIVE_COMMENTS_DATA__')!.innerText,
);
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <MemoryRouter>
    <App initalData={props} />
  </MemoryRouter>,
);
