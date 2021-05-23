import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaRegLightbulb } from 'react-icons/fa';

import Popup from './popup';
import Drawer from './drawer';
import styles from './layout.module.css';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export const siteTitle = 'Liked Tweets';

export default function Layout({ children }) {
  const router = useRouter();
  const { isAuth, setIsAuth } = useAuth();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const isDark = theme === 'dark';

  const handleSearchQueryInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  const changeTheme = () => {
    const currentTheme = isDark ? 'light' : 'dark';
    window.localStorage.setItem('theme', currentTheme);
    setTheme(currentTheme);
  };

  const themeColor = isDark ? '#15202b' : '#fff';

  return (
    <div style={{ position: 'relative', backgroundColor: themeColor }}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='The most liked tweets on Twitter' />
        <meta
          property='og:image'
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
      </Head>
      <div className={styles.headerDiv}>
        <div className={styles.leftHeader}>
          <header className={styles.innerHeader}>
            <Link href='/'>
              <h1 className={isDark ? styles.siteName : styles.siteNameLight}>
                LT
              </h1>
            </Link>
          </header>
          <form onSubmit={handleSearchSubmit} className={styles.container}>
            <input
              className={isDark ? styles.headerInput : styles.headerInputLight}
              type='text'
              placeholder='Search for a tweet or user...'
              maxLength={40}
              value={searchQuery}
              onChange={handleSearchQueryInput}
            />
          </form>
        </div>
        <div style={{ display: 'flex' }}>
          <FaRegLightbulb
            onClick={changeTheme}
            size='2.5rem'
            className={styles.themeMode}
            color={isDark ? '#82929f' : '#2ba1f2'}
          />
          {isAuth ? <Drawer /> : <Popup />}
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
}
