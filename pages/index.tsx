import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

import Layout, { siteTitle } from '../components/layout';
import Card from '../components/card';
import { New_Tweet } from '../types/type';
import styles from '../styles/home.module.css';
import Paginate from '../hooks/paginate';

interface HomeProps {
  data: New_Tweet[];
}

export default function Home(props: HomeProps) {
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
          <a className={styles.selected}>Trending</a>
        </Link>

        <Link href='/news'>
          <a className={styles.button}>News</a>
        </Link>
      </div>

      <section className={styles.home}>
        <h2>Trending</h2>
        <ul
          style={{
            listStyle: 'none',
            margin: '0',
            padding: '0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {props.data.map((t) => {
            return (
              <div key={t.id_str} style={{ marginBottom: '5rem' }}>
                <Card tweet={t} />
              </div>
            );
          })}
          {Paginate('trending')}
        </ul>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const res = await axios(
    'https://peaceful-reef-54258.herokuapp.com/api/v1/trending?per_page=25&page=0'
  );

  const data: New_Tweet[] = await res.data;

  return {
    props: {
      data,
    },
  };
};
