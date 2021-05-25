import { memo, useEffect, useState } from 'react';
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
import { useLoading } from '../contexts/LoadContext';
import { useAuth } from '../contexts/AuthContext';

interface HomeProps {
  tweets: NewTweet[];
  logged: boolean;
  users: TweetUser[];
}

function Sports({ tweets, logged, users }: HomeProps) {
  const [sortBy, setSortBy] = useState('trend');
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [useData, setUseData] = useState<NewTweet[]>(tweets);
  const { theme, setTheme } = useTheme();
  const { isAuth, setIsAuth } = useAuth();
  const { isLoading, setIsLoading } = useLoading();
  const isDark = theme === 'dark';

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const fetchTweets = async () => {
    setLoadMore(true);

    try {
      const res = await axios(
        `https://peaceful-reef-54258.herokuapp.com/api/v1/trending?sort_by=${sortBy}&per_page=25&page=${page}`,
        { withCredentials: true }
      );

      const tweets: NewTweet[] = res.data['tweets'];

      setUseData([...useData, ...tweets]);
      setPage(page + 1);
      setIsEnd(!tweets.length);
    } catch (err) {
      console.log(err);
    }

    setLoadMore(false);
  };

  const handleTrendingSort = async (sort: string) => {
    setSortBy(sort);
    setIsLoading(true);

    const res = await axios(
      `https://peaceful-reef-54258.herokuapp.com/api/v1/sports?per_page=25&page=0&sort_by=${sort}`,
      { withCredentials: true }
    );

    const { tweets, logged } = res.data;

    setUseData(tweets);
    setIsAuth(logged);
    setIsLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <div className={isDark ? styles.navBar : styles.navBarLight}>
        <Link href='#'>
          <a className={isDark ? styles.selected : styles.selectedLight}>
            Sports
          </a>
        </Link>

        <Link href='/'>
          <a
            onClick={() => setIsLoading(true)}
            className={isDark ? styles.button : styles.buttonLight}
          >
            Trending
          </a>
        </Link>

        <Link href='/news'>
          <a
            onClick={() => setIsLoading(true)}
            className={isDark ? styles.button : styles.buttonLight}
          >
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
              Sports
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
            <button
              style={{ marginBottom: '8rem' }}
              className={isDark ? styles.loadMore : styles.loadMoreLight}
              disabled={loadMore || isEnd}
              onClick={async () => fetchTweets()}
            >
              {loadMore
                ? 'Loading...'
                : isEnd
                ? 'No More Tweets'
                : 'Load More Tweets'}
            </button>
          </ul>
        </section>
        <section className={styles.sidebar}>
          <SideBar data={users} />
        </section>
      </main>
    </Layout>
  );
}

export default memo(Sports);

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const res = await axios(
    `https://peaceful-reef-54258.herokuapp.com/api/v1/sports?per_page=25&page=0`,
    {
      withCredentials: true,
      headers: { cookie: ctx.req?.headers?.cookie ?? null },
    }
  );

  const { tweets, logged } = res.data;

  const r = await axios(
    'https://peaceful-reef-54258.herokuapp.com/api/v1/sports/top-users',
    {
      withCredentials: true,
      headers: { cookie: ctx.req?.headers?.cookie ?? null },
    }
  );

  const users: TweetUser[] = await r.data;

  return {
    props: {
      tweets,
      logged,
      users,
    },
  };
};
