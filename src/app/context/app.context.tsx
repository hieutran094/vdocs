'use client';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext({
  token: '',
  isOpenSidebar: false,
  setIsOpenSidebar: (_isOpenSidebar: boolean) => {},
  setToken: (_token: string) => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContect must be used within an AppProvider');
  }
  return context;
};

export default function AppProvider({
  children,
  initToken = '',
}: {
  children: React.ReactNode;
  initToken?: string;
}) {
  const [token, setToken] = useState(initToken);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <AppContext.Provider
      value={{ token, setToken, isOpenSidebar, setIsOpenSidebar }}
    >
      {children}
    </AppContext.Provider>
  );
}
