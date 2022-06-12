import React from 'react';
import { Routes, Route } from 'react-router-dom';

type Props = {};

function App({}: Props) {
  return (
    <Routes>
      <Route path="/" element={<div>테스트입니다.</div>} />
    </Routes>
  );
}

export default App;
