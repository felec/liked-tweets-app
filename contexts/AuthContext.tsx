import { createContext, useContext } from 'react';

export type AuthContextType = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
};

export const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => useContext(AuthContext);
