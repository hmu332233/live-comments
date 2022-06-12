import { AuthActionContext } from '../contexts/AuthContext';
import React, { useContext, useEffect } from 'react';
import Iframe from '../components/Iframe';
import LoginModal from '../components/LoginModal';

type Props = {};

function Login({}: Props) {
  const { login } = useContext(AuthActionContext);

  const handleSubmit = ({
    name,
    code,
    useCode,
  }: {
    name: string;
    code: string;
    useCode: boolean;
  }) => {
    login({ name, code, useCode });
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
