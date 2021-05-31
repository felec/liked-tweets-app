import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import Favs from './favs';
import styles from '../../styles/home.module.css';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';
import Layout, { siteTitle } from '../../components/layout';
import { useTheme } from '../../contexts/ThemeContext';

function User() {
  const [isVerified, setIsVerified] = useState(false);
  const { query, isReady } = useRouter();
  const { isAuth, setIsAuth } = useAuth();
  const { user, setUser } = useUser();
  const token = query['oauth_token'];
  const verifier = query['oauth_verifier'];
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const getAuth = async () => {
      try {
        await axios(
          `https://peaceful-reef-54258.herokuapp.com/api/v1/auth/authenticate?oauth_token=${token}&oauth_verifier=${verifier}`,
          {
            withCredentials: true,
          }
        );

        setIsVerified(true);
      } catch (err) {
        console.log(err);
      }
    };

    if (isReady && token && verifier) {
      getAuth();
    }
  }, [isReady, token, verifier]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios(
          `https://peaceful-reef-54258.herokuapp.com/api/v1/profile/user`,
          { withCredentials: true }
        );

        const { user, logged } = res.data;

        setUser(user);
        setIsAuth(logged);
      } catch (err) {
        console.log(err);
      }
    };

    if (isVerified || isAuth) {
      getUser();
    }
  }, [isVerified, isAuth]);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={isDark ? styles.navBar : styles.navBarLight}>
        <Link href='/sports'>
          <a className={isDark ? styles.button : styles.buttonLight}>Sports</a>
        </Link>

        <Link href='/'>
          <a className={isDark ? styles.button : styles.buttonLight}>
            Trending
          </a>
        </Link>

        <Link href='/news'>
          <a className={isDark ? styles.button : styles.buttonLight}>News</a>
        </Link>

        <div className={styles.selected}>Likes</div>
      </div>

      <section style={{ minHeight: '100vh' }} className={styles.home}>
        {isAuth && <Favs />}
      </section>
    </Layout>
  );
}

export default memo(User);
