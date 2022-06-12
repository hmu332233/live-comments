import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import Code from './pages/Code';

type Props = {};

function App({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/code/:code" element={<Code />} />
    </Routes>
  );
}

export default App;
