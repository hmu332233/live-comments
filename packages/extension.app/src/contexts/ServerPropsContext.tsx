import React, { createContext } from 'react';

export const ServerPropsContext = createContext<any>(null);
type ProviderProps = { children: React.ReactNode; value: any };
export function ServerPropsProvider({ children, value }: ProviderProps) {
  return (
    <ServerPropsContext.Provider value={value}>
      {children}
    </ServerPropsContext.Provider>
  );
}
