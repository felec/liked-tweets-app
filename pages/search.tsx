import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';

import Layout, { siteTitle } from '../components/layout';
import { NewTweet } from '../types/type';
import styles from '../styles/home.module.css';
import Card from '../components/card';

interface HomeProps {
  data: NewTweet[];
}

export default function Tweets(props: HomeProps) {
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
      </div>

      <section className={styles.home}>
        <h2>Search Results</h2>
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const res = await axios(
    encodeURI(
      `https://peaceful-reef-54258.herokuapp.com/api/v1/trending/search?q=${ctx.query.q}`
    )
  );
  const data: NewTweet[] = await res.data;

  console.log(data[0]);

  return {
    props: {
      data,
    },
  };
};
