import { useEffect, useState } from 'react';
import axios from 'axios';

import { NewTweet } from '../../types/type';
import Card from '../../components/card';
import styles from '../../styles/home.module.css';
import { useTheme } from '../../contexts/ThemeContext';

export default function Favs() {
  const [favs, setFavs] = useState<NewTweet[]>([]);
  const [lastId, setLastId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const fetchFavs = async () => {
    setIsLoading(true);

    try {
      const res = await axios(
        `https://peaceful-reef-54258.herokuapp.com/api/v1/profile/favs?max_id=${lastId}&count=25`,
        { withCredentials: true }
      );

      const tweets: NewTweet[] = res.data;

      tweets.shift();

      setFavs([...favs, ...tweets]);
      setIsEnd(!tweets.length);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (favs.length) {
      const id = favs[favs.length - 1].id_str;
      setLastId(id);
    }
  }, [favs]);

  useEffect(() => {
    const getFavs = async () => {
      try {
        const res = await axios(
          `https://peaceful-reef-54258.herokuapp.com/api/v1/profile/favs`,
          { withCredentials: true }
        );

        const tweets: NewTweet[] = res.data;

        setFavs(tweets);
      } catch (err) {
        console.log(err);
      }
    };

    getFavs();
  }, []);

  return (
    <div style={{ margin: '4rem 0' }}>
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
        {favs.map((f) => {
          return (
            <li key={f.id_str} style={{ marginBottom: '5rem' }}>
              <Card tweet={f} isTwitter={true} />
            </li>
          );
        })}
      </ul>
      <button
        className={isDark ? styles.loadMore : styles.loadMoreLight}
        disabled={isLoading || isEnd}
        onClick={async () => {
          await fetchFavs();
        }}
        style={{ alignSelf: 'flex-end' }}
      >
        {isLoading
          ? 'Loading...'
          : isEnd
          ? 'No More Tweets'
          : 'Load More Tweets'}
      </button>
    </div>
  );
}
