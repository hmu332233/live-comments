import { AuthActionContext } from '../contexts/AuthContext';
import React, { useContext, useEffect } from 'react';

type Props = {};

function Login({}: Props) {
  const { login } = useContext(AuthActionContext);

  return (
    <div>
      로그인 페이지 예정
      <button onClick={login}>로그인</button>
    </div>
  );
}

export default Login;
