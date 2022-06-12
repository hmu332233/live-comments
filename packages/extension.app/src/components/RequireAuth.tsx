import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { AuthStateContext } from '../contexts/AuthContext';

type Props = {
  children: JSX.Element;
};

function RequireAuth({ children }: Props) {
  const auth = useContext(AuthStateContext);
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
