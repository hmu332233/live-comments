import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Code from './pages/Code';

type Props = {};

function App({}: Props) {
  return (
    <Routes>
      <Route path="/code/:code" element={<Code />} />
    </Routes>
  );
}

export default App;
