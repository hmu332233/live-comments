import React, { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { AuthStateContext } from '../contexts/AuthContext';

type Props = {
  children: JSX.Element;
};

function RequireAuth({ children }: Props) {
  const auth = useContext(AuthStateContext);

  if (!auth) {
    console.log('로그인 안됨');
    // replace를 줘서 뒤로가기시 로그인 페이지로 가지 않도록 하고
    // 로그인 이후에 본래 가려고 했던 페이지로 보낼 수 있도록 pathname을 state로 넘겨준다.
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
