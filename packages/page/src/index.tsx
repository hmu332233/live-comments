import React from 'react';
import { createRoot } from 'react-dom/client';

import './global.css';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
