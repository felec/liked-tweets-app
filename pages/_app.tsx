import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  // const cookieTheme = window.localStorage.getItem('theme');
  const [isAuth, setIsAuth] = useState(false);
  const [theme, setTheme] = useState(0);
  const [user, setUser] = useState(null);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Component {...pageProps} />;
        </UserContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
