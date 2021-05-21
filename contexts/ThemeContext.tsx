import { createContext, useContext } from 'react';

export type ThemeContextType = {
  theme: number;
  setTheme: (Theme: number) => void;
};

export const ThemeContext = createContext<ThemeContextType>(null);

export const useTheme = () => useContext(ThemeContext);
