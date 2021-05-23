import { memo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import {
  AiOutlineClockCircle,
  AiOutlineHeart,
  AiOutlineRetweet,
  AiOutlineRise,
} from 'react-icons/ai';

import Layout, { siteTitle } from '../components/layout';
import SideBar from '../components/sidebar';
import Card from '../components/card';
import { NewTweet, TweetUser } from '../types/type';
import styles from '../styles/home.module.css';
import Paginate from '../hooks/paginate';
import { useTheme } from '../contexts/ThemeContext';

interface HomeProps {
  data: NewTweet[];
  users: TweetUser[];
}

function News({ data, users }: HomeProps) {
  const [sortBy, setSortBy] = useState('trend');
  const [isLoading, setIsLoading] = useState(false);
  const [useData, setUseData] = useState<NewTweet[]>(data);
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleTrendingSort = async (sort: string) => {
    setSortBy(sort);
    setIsLoading(true);

    const res = await axios(
      `https://peaceful-reef-54258.herokuapp.com/api/v1/news?per_page=25&page=0&sort_by=${sort}`
    );
    setIsLoading(false);

    const data = res.data;
    setUseData(data);
  };

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
          <a className={isDark ? styles.selected : styles.selectedLight}>
            News
          </a>
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
            <h2
              className={
                isDark ? styles.categoryTitle : styles.categoryTitleLight
              }
            >
              News
            </h2>
            <AiOutlineRise
              onClick={() => handleTrendingSort('trend')}
              size='1.8rem'
              color={
                sortBy === 'trend' ? '#2795e0' : isDark ? '#82929f' : '#acb1b6'
              }
              className={styles.trendSort}
            />

            <AiOutlineClockCircle
              onClick={() => handleTrendingSort('date')}
              size='1.8rem'
              color={
                sortBy === 'date' ? '#f5ad35' : isDark ? '#82929f' : '#acb1b6'
              }
              className={styles.dateSort}
            />

            <AiOutlineHeart
              onClick={() => handleTrendingSort('favorite')}
              size='1.8rem'
              color={
                sortBy === 'favorite'
                  ? '#e2495f'
                  : isDark
                  ? '#82929f'
                  : '#acb1b6'
              }
              className={styles.favSort}
            />
            <AiOutlineRetweet
              onClick={() => handleTrendingSort('retweet')}
              size='1.8rem'
              color={
                sortBy === 'retweet'
                  ? '#6cc165'
                  : isDark
                  ? '#82929f'
                  : '#acb1b6'
              }
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
            {Paginate('news', sortBy)}
          </ul>
        </section>
        <section className={styles.sidebar}>
          <SideBar data={users} />
        </section>
      </main>
    </Layout>
  );
}

export default memo(News);

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const res = await axios(
    `https://peaceful-reef-54258.herokuapp.com/api/v1/news?per_page=25&page=0`
  );

  const data: NewTweet[] = await res.data;

  const r = await axios(
    'https://peaceful-reef-54258.herokuapp.com/api/v1/news/top-users'
  );

  const users: TweetUser[] = await r.data;

  return {
    props: {
      data,
      users,
    },
  };
};
