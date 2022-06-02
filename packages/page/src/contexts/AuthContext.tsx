import React, { useState, createContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { IUser } from 'types';

type AuthActionType = {
  login: () => void;
  logout: () => void;
};

export const AuthStateContext = createContext<IUser | null>(null);
export const AuthActionContext = createContext<AuthActionType>(null!);

type AuthProviderProps = { children: React.ReactNode };
export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      ({ action, payload }, sender, sendResponse) => {
        setUser({
          id: payload.uid,
          lastLoginAt: payload.lastLoginAt,
        });
        navigate('/', { replace: true });
      },
    );
  }, []);

  const login = () => {
    chrome.runtime.sendMessage({ action: 'LOGIN' });
  };

  const logout = () => {
    setUser(null);
  };

  const action = { login, logout };

  return (
    <AuthActionContext.Provider value={action}>
      <AuthStateContext.Provider value={user}>
        {children}
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  );
}
