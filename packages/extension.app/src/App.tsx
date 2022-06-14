import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';
import Not from './pages/Not';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './contexts/AuthContext';
import { ServerPropsProvider } from './contexts/ServerPropsContext';

type Props = { initalData: any };

function App({ initalData }: Props) {
  return (
    <ServerPropsProvider value={initalData}>
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
    </ServerPropsProvider>
  );
}

export default App;
