import { createContext, useContext } from 'react';

export type LoadContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const LoadContext = createContext<LoadContextType>(null);

export const useLoading = () => useContext(LoadContext);
