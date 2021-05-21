import { NewTweet } from '../types/type';
import styles from '../components/quote/quote.module.css';

export const truncateNames = (tweet: NewTweet) => {
  const alpha = { W: 1, Q: 1, U: 1, M: 1, G: 1, H: 1 };
  let qName = tweet.q_name;
  let sName = tweet.q_screen_name;
  let total = sName.length;

  tweet.q_screen_name.split('').map((l) => {
    for (const [key, val] of Object.entries(alpha)) {
      if (l === key) total += val;
    }
  });

  if (qName.length > 14) {
    if (qName.length > 17) {
      for (let i = 12; i < qName.length; i++) {
        qName = qName.slice(0, -1);
      }
      return (
        <h2 className={styles.quoteName}>
          {qName}...{' '}
          {tweet.q_verified && (
            <img
              className={styles.verified}
              src='../images/verified-light.png'
            />
          )}
        </h2>
      );
    }
    return (
      <h2 className={styles.quoteName}>
        {qName}...{' '}
        {tweet.q_verified && (
          <img className={styles.verified} src='../images/verified-light.png' />
        )}
      </h2>
    );
  } else if (qName.length + total > 24) {
    if (total > sName.length) {
      for (let i = 5; i < total; i++) {
        sName = sName.slice(0, -1);
      }
      return (
        <>
          <h2 className={styles.quoteName}>
            {qName}{' '}
            {tweet.q_verified && (
              <img
                className={styles.verified}
                src='../images/verified-light.png'
              />
            )}
          </h2>{' '}
          <h3 className={styles.quoteScreenName}>@{sName}...</h3>
        </>
      );
    }
    for (let i = 5; i < total; i++) {
      sName = sName.slice(0, -1);
    }
    return (
      <>
        <h2 className={styles.quoteName}>
          {qName}{' '}
          {tweet.q_verified && (
            <img
              className={styles.verified}
              src='../images/verified-light.png'
            />
          )}
        </h2>{' '}
        <h3 className={styles.quoteScreenName}>@{sName}...</h3>
      </>
    );
  } else {
    return (
      <>
        <h2 className={styles.quoteName}>
          {qName}{' '}
          {tweet.q_verified && (
            <img
              className={styles.verified}
              src='../images/verified-light.png'
            />
          )}
        </h2>{' '}
        <h3 className={styles.quoteScreenName}>@{sName}</h3>
      </>
    );
  }
};
