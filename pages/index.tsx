import { useState } from 'react';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import {
  AiOutlineClockCircle,
  AiOutlineHeart,
  AiOutlineRetweet,
} from 'react-icons/ai';

import Layout, { siteTitle } from '../components/layout';
import SideBar from '../components/sidebar/sidebar';
import Card from '../components/card';
import { NewTweet, TweetUser } from '../types/type';
import styles from '../styles/home.module.css';
import Paginate from '../hooks/paginate';

interface HomeProps {
  data: NewTweet[];
  users: TweetUser[];
}

export default function Home({ data, users }: HomeProps) {
  const [sortBy, setSortBy] = useState('date');
  const [isLoading, setIsLoading] = useState(false);
  const [useData, setUseData] = useState<NewTweet[]>(data);

  const handleTrendingSort = async (sort: string) => {
    setSortBy(sort);
    setIsLoading(true);

    const res = await axios(
      `https://peaceful-reef-54258.herokuapp.com/api/v1/trending?per_page=25&page=0&sort_by=${sort}`
    );
    setIsLoading(false);

    setUseData(res.data);
  };

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

      <main>
        <section className={styles.home}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2 style={{ marginLeft: '8rem' }}>Trending</h2>
            {isLoading && sortBy === 'date' ? (
              <h4>Loading...</h4>
            ) : (
              <AiOutlineClockCircle
                onClick={() => handleTrendingSort('date')}
                size='1.8rem'
                color={sortBy === 'date' ? '#f5ad35' : 'white'}
                className={styles.dateSort}
              />
            )}

            <AiOutlineHeart
              onClick={() => handleTrendingSort('favorite')}
              size='1.8rem'
              color={sortBy === 'favorite' ? '#e2495f' : 'white'}
              className={styles.favSort}
            />
            <AiOutlineRetweet
              onClick={() => handleTrendingSort('retweet')}
              size='1.8rem'
              color={sortBy === 'retweet' ? '#6cc165' : 'white'}
              className={styles.retweetSort}
            />
          </div>
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
            {useData.map((t) => {
              return (
                <li key={t.id_str} style={{ marginBottom: '5rem' }}>
                  <Card tweet={t} isTwitter={false} />
                </li>
              );
            })}
            {Paginate('trending', sortBy)}
          </ul>
        </section>
        <section className={styles.sidebar}>
          <SideBar data={users} />
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const res = await axios(
    `https://peaceful-reef-54258.herokuapp.com/api/v1/trending?per_page=25&page=0`
    // 'http://localhost:3001/api/v1/trending?per_page=25&page=0'
  );

  const data: NewTweet[] = await res.data;

  const res2 = await axios(
    'https://peaceful-reef-54258.herokuapp.com/api/v1/trending/top-users'
  );

  const users: TweetUser[] = await res2.data;

  return {
    props: {
      data,
      users,
    },
  };
};
