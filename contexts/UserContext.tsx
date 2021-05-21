import { createContext, useContext } from 'react';
import { LoginUser } from '../types/type';

export type UserContextType = {
  user: LoginUser;
  setUser: (user: LoginUser) => void;
};

export const UserContext = createContext<UserContextType>(null);

export const useUser = () => useContext(UserContext);
