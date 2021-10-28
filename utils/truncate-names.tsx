import { NewTweet } from '../types/type';
import styles from '../components/quote/quote.module.css';

// An arbitrary way of shortening screen names so do not overflow
// Based on certain letter sizes, rank the physical length of
// the name, and truncate based on the calculated size and add to total
export const truncateNames = (tweet: NewTweet, isDark: boolean) => {
  const alpha = { W: 1, Q: 1, U: 1, M: 1, G: 1, H: 1 };
  let uName = tweet.q_name;
  let sName = tweet.q_screen_name;
  let total = sName.length;

  tweet.q_screen_name.split('').map((l) => {
    for (const [key, val] of Object.entries(alpha)) {
      if (l === key) total += val;
    }
  });

  // If the username is too long,
  // omit the screen name
  if (uName.length > 14) {
    if (uName.length > 17) {
      for (let i = 12; i < uName.length; i++) {
        uName = uName.slice(0, -1);
      }

      return (
        <h2 className={isDark ? styles.quoteName : styles.quoteNameLight}>
          {uName}...{' '}
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
      <h2 className={isDark ? styles.quoteName : styles.quoteNameLight}>
        {uName}...{' '}
        {tweet.q_verified && (
          <img className={styles.verified} src='../images/verified-light.png' />
        )}
      </h2>
    );
  } else if (uName.length + total > 24) {
    // Handle worst case scenario,
    // ex: someone with username WWWWWWWWWWWWWW (14 W's)
    // will overflow, so name + total will be 28

    // Allow username to display,
    // shorten screen name
    for (let i = 5; i < total; i++) {
      sName = sName.slice(0, -1);
    }

    return (
      <>
        <h2 className={isDark ? styles.quoteName : styles.quoteNameLight}>
          {uName}{' '}
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
        <h2 className={isDark ? styles.quoteName : styles.quoteNameLight}>
          {uName}{' '}
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
