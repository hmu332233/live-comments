import { AuthActionContext } from '../contexts/AuthContext';
import React, { useContext, useEffect } from 'react';
import Iframe from '../components/Iframe';
import LoginModal from '../components/LoginModal';

type Props = {};

function Login({}: Props) {
  const { login } = useContext(AuthActionContext);

  const handleSubmit = ({ name, code }: { name: string; code: string }) => {
    login({ name, code });
  };

  return (
    <div className="flex w-screen h-screen">
      <div className="flex relative w-full h-full">
        <Iframe src={location.href} />
        <LoginModal onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Login;
