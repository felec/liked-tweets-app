import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';

import Favs from './favs';
import styles from '../../styles/home.module.css';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';
import Layout, { siteTitle } from '../../components/layout';

export default function User() {
  const [isVerified, setIsVerified] = useState(false);
  const { query, isReady } = useRouter();
  const { isAuth, setIsAuth } = useAuth();
  const { user, setUser } = useUser();
  const token = query['oauth_token'];
  const verifier = query['oauth_verifier'];
  const cookie = Cookies.get('logged');

  useEffect(() => {
    const getAuth = async () => {
      try {
        await axios(
          `https://peaceful-reef-54258.herokuapp.com/api/v1/auth/authenticate?oauth_token=${token}&oauth_verifier=${verifier}`,
          { withCredentials: true }
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

        setUser(res.data);
        setIsAuth(true);
      } catch (err) {
        console.log(err);
      }
    };

    if (isVerified || cookie) {
      getUser();
    }
  }, [isVerified, cookie]);

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={styles.navBar}>
        <Link href='/sports'>
          <a className={styles.button}>Sports</a>
        </Link>

        <Link href='/'>
          <a className={styles.button}>Trending</a>
        </Link>

        <Link href='/news'>
          <a className={styles.button}>News</a>
        </Link>

        <div className={styles.selected}>Favs</div>
      </div>

      <section style={{ minHeight: '100vh' }} className={styles.home}>
        {isAuth && <Favs />}
      </section>
    </Layout>
  );
}