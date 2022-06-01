import React, { useState, createContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

type AuthActionType = {
  login: () => void;
  logout: () => void;
};

export const AuthStateContext = createContext<Boolean>(false);
export const AuthActionContext = createContext<AuthActionType>(null!);

type AuthProviderProps = { children: React.ReactNode };
export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    navigate('/', { replace: true });
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const action = { login, logout };

  return (
    <AuthActionContext.Provider value={action}>
      <AuthStateContext.Provider value={isLoggedIn}>
        {children}
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  );
}
