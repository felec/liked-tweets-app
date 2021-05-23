import React from 'react';
import { useSWRInfinite } from 'swr';
import axios from 'axios';
import Card from '../components/card';
import styles from '../styles/home.module.css';
import { useTheme } from '../contexts/ThemeContext';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const PAGE_SIZE = 25;

export default function Paginate(category: string, sortBy: string) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `https://peaceful-reef-54258.herokuapp.com/api/v1/${category}?sort_by=${sortBy}&per_page=${PAGE_SIZE}&page=${
        index + 1
      }`,
    fetcher
  );
  // const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
  //   (index) =>
  //     `http://localhost:3001/api/v1/${category}?per_page=${PAGE_SIZE}&page=${
  //       index + 1
  //     }`,
  //   fetcher
  // );

  const tweets = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5rem',
      }}
    >
      {tweets.map((t) => {
        return (
          <div key={t.id_str} style={{ marginBottom: '5rem' }}>
            <Card tweet={t} isTwitter={false} />
          </div>
        );
      })}
      <button
        className={isDark ? styles.loadMore : styles.loadMoreLight}
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore
          ? 'Loading...'
          : isReachingEnd
          ? 'No More Tweets'
          : 'Load More Tweets'}
      </button>
    </div>
  );
}
