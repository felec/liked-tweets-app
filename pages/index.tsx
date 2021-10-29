import { memo, useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import {
  AiOutlineClockCircle,
  AiOutlineHeart,
  AiOutlineRetweet,
  AiOutlineRise,
} from 'react-icons/ai';

import { likedTweets } from '../api';
import { NewTweet, TweetUser } from '../types/type';
import Card from '../components/card';
import Tabbar from '../components/tabbar';
import SideBar from '../components/sidebar';
import Layout, { siteTitle } from '../components/layout';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLoading } from '../contexts/LoadContext';
import styles from '../styles/home.module.css';

interface HomeProps {
  tweets: NewTweet[];
  logged: boolean;
  users: TweetUser[];
}

function Home({ tweets, logged, users }: HomeProps) {
  const [sortBy, setSortBy] = useState('trend');
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [data, setData] = useState<NewTweet[]>(tweets);
  const { theme } = useTheme();
  const { setIsAuth } = useAuth();
  const { setIsLoading } = useLoading();
  const isDark = theme === 'dark';

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const fetchTweets = async () => {
    setLoadMore(true);

    try {
      const res = await likedTweets.get(
        `trending?sort_by=${sortBy}&per_page=25&page=${page}`,
        {
          withCredentials: true,
        }
      );

      const tweets: NewTweet[] = res.data['tweets'];

      setData([...data, ...tweets]);
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

    const res = await likedTweets.get(
      `trending?per_page=25&page=0&sort_by=${sort}`,
      {
        withCredentials: true,
      }
    );

    const { tweets, logged } = res.data;

    setData(tweets);
    setIsAuth(logged);
    setIsLoading(false);
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <Tabbar name={''} />

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
              Trending
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
            {data.map((t) => {
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

export default memo(Home);

// Fetch data from node server and pre-render the page
export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const res = await likedTweets.get('trending?per_page=25&page=0', {
    withCredentials: true,
    headers: { cookie: ctx.req?.headers?.cookie ?? null },
  });

  const { tweets, logged } = await res.data;

  const res2 = await likedTweets.get('trending/top-users', {
    withCredentials: true,
    headers: { cookie: ctx.req?.headers?.cookie ?? null },
  });

  const users: TweetUser[] = await res2.data;

  return {
    props: {
      tweets,
      logged,
      users,
    },
  };
};
