import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import Not from './pages/Not';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './contexts/AuthContext';

type Props = {};

function App({}: Props) {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Main />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
