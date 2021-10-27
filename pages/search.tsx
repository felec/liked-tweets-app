import { memo } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';

import Layout, { siteTitle } from '../components/layout';
import { NewTweet } from '../types/type';
import styles from '../styles/home.module.css';
import Card from '../components/card';
import { useTheme } from '../contexts/ThemeContext';

interface HomeProps {
  data: NewTweet[];
}

function Search(props: HomeProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
      </div>

      <section
        style={{ display: 'flex', minHeight: '100vh', justifyContent: 'start' }}
        className={styles.home}
      >
        <h2 className={isDark ? styles.seachTitle : styles.seachTitleLight}>
          Search Results
        </h2>
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {props.data.length &&
            props.data.map((t) => {
              return (
                <div key={t.id_str} style={{ marginBottom: '5rem' }}>
                  <Card tweet={t} isTwitter={false} />
                </div>
              );
            })}
        </ul>
      </section>
    </Layout>
  );
}

export default memo(Search);

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const res = await axios(
    encodeURI(
      `https://peaceful-reef-54258.herokuapp.com/api/v1/trending/search?q=${ctx.query.q}`
    ),
    {
      withCredentials: true,
      headers: { cookie: ctx.req?.headers?.cookie ?? null },
    }
  );
  const data: NewTweet[] = await res.data;

  return {
    props: {
      data,
    },
  };
};
