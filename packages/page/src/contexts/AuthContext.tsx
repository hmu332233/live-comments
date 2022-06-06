import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { IAuth, IUser } from 'types';

type AuthActionType = {
  login: (code: string) => void;
  logout: () => void;
};

export const AuthStateContext = createContext<IAuth | null>(null);
export const AuthActionContext = createContext<AuthActionType>(null!);

type AuthProviderProps = { children: React.ReactNode };
export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [auth, setAuth] = useState<IAuth | null>(null);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(
      ({ action, payload }, sender, sendResponse) => {
        switch (action) {
          case 'LOGIN_COMPLETE': {
            const { user, page } = payload;
            setAuth({
              user: {
                id: user.uid,
                lastLoginAt: user.lastLoginAt,
              },
              page: {
                code: page.code,
                url: page.url,
              },
            });
            navigate('/', { replace: true });
          }
        }
      },
    );
  }, []);

  const login = useCallback((code: string) => {
    chrome.runtime.sendMessage({
      action: 'LOGIN',
      payload: { code: code || 'asdf', url: location.href },
    });
  }, []);

  const logout = useCallback(() => {
    setAuth(null);
  }, []);

  const action = useMemo(() => ({ login, logout }), [login, logout]);

  return (
    <AuthActionContext.Provider value={action}>
      <AuthStateContext.Provider value={auth}>
        {children}
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  );
}
