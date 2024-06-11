'use client';
import { createContext, useContext, useState } from 'react';
import { LoginUser } from '@/types';

const AppContext = createContext<{
  token: string;
  isOpenSidebar: boolean;
  isLoading: boolean;
  loginUser: LoginUser | null;
  setIsOpenSidebar: (_isOpenSidebar: boolean) => void;
  setIsLoading: (_isLoading: boolean) => void;
  setToken: (_token: string) => void;
  setLoginUser: (_user: LoginUser) => void;
}>({
  token: '',
  isOpenSidebar: false,
  isLoading: false,
  loginUser: null,
  setIsOpenSidebar: (_isOpenSidebar: boolean) => {},
  setIsLoading: (_isLoading: boolean) => {},
  setToken: (_token: string) => {},
  setLoginUser: (_user: LoginUser) => {},
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
  initLoginUser = null,
}: {
  children: React.ReactNode;
  initToken?: string;
  initLoginUser?: LoginUser | null;
}) {
  const [token, setToken] = useState(initToken);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginUser, setLoginUser] = useState<LoginUser | null>(initLoginUser);
  return (
    <AppContext.Provider
      value={{
        token,
        setToken,
        isOpenSidebar,
        setIsOpenSidebar,
        isLoading,
        setIsLoading,
        loginUser,
        setLoginUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
