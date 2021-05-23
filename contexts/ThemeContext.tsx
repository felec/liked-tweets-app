import { createContext, useContext } from 'react';

export type ThemeContextType = {
  theme: string;
  setTheme: (Theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextType>(null);

export const useTheme = () => useContext(ThemeContext);
