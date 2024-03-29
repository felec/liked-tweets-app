import NumAbbr from 'number-abbreviate';

import Quote from '../quote';
import { cdn } from '../../utils/cdn';
import Media from '../../utils/media';
import { NewTweet } from '../../types/type';
import styles from './card.module.css';
import { useTheme } from '../../contexts/ThemeContext';

export default function Card({
  tweet,
  isTwitter,
}: {
  tweet: NewTweet;
  isTwitter: boolean;
}) {
  const numAbbr = new NumAbbr(['K', 'M', 'B', 'T']);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const created = Date.parse(tweet.created_at);
  const date = new Date(created);
  let f_text = tweet.full_text;

  if (f_text.includes('http')) {
    const ftList = f_text.split(' ');
    f_text = ftList
      .filter((ft) => {
        return !ft.includes('http');
      })
      .join(' ');
  }

  const truncateScrNme = (name: string) => {
    if (name.length > 27) {
      return `${name.slice(0, 28)}...`;
    }
    return name;
  };

  const truncateDescr = (desc: string) => {
    if (desc.length > 65) {
      return `${desc.slice(0, 66)}...`;
    }
    return desc;
  };

  const dateTime = date.toLocaleTimeString();
  const timeList = dateTime.split(' ');
  const time = timeList[0].split(':');
  const finalTime = `${time[0]}:${time[1]} ${timeList[1]}`;

  const local = date.toLocaleDateString();
  const localList = local.split('/');
  const year = localList[2].slice(2, localList[2].length);
  const localDate = `${localList[0]}/${localList[1]}/${year}`;

  return (
    <div className={isDark ? styles.card : styles.cardLight}>
      <div className={styles.cardHeader}>
        <img
          src={cdn(tweet.profile_image_url_https)}
          className={styles.avatar}
          alt='profile picture'
        />

        <div className={styles.cardHeaderInfo}>
          <h2 className={isDark ? styles.name : styles.nameLight}>
            {truncateScrNme(tweet.name)}{' '}
            {tweet.verified && (
              <img
                className={styles.verified}
                src={
                  isDark
                    ? '../images/verified-light.png'
                    : '../images/verified-blue.png'
                }
              />
            )}
          </h2>{' '}
          <h3 className={styles.screenName}>@{tweet.screen_name}</h3>
        </div>
      </div>

      <div className={isDark ? styles.profilePeek : styles.profilePeekLight}>
        <img
          className={styles.avatar}
          src={cdn(tweet.profile_image_url_https)}
          alt='profile pic'
        />
        <h2 className={isDark ? styles.name : styles.nameLight}>
          {tweet.name}{' '}
          {tweet.verified && (
            <img
              className={styles.verified}
              src={
                isDark
                  ? '../images/verified-light.png'
                  : '../images/verified-blue.png'
              }
            />
          )}
        </h2>{' '}
        <h3 className={styles.screenName}>@{tweet.screen_name}</h3>
        <p className={isDark ? styles.desc : styles.descLight}>
          {truncateDescr(tweet.description)}
        </p>
        <div style={{ display: 'flex' }}>
          <p
            style={{ marginRight: '2rem' }}
            className={
              isDark ? styles.profilePeekFooter : styles.profilePeekFooterLight
            }
          >
            <span
              className={
                isDark ? styles.cardFooterCount : styles.cardFooterCountLight
              }
            >
              {numAbbr.abbreviate(tweet.friends_count, 1)}
            </span>{' '}
            Following{' '}
          </p>

          <p
            className={
              isDark ? styles.profilePeekFooter : styles.profilePeekFooterLight
            }
          >
            <span
              className={
                isDark ? styles.cardFooterCount : styles.cardFooterCountLight
              }
            >
              {numAbbr.abbreviate(tweet.followers_count, 1)}
            </span>{' '}
            Followers
          </p>
        </div>
      </div>

      <p
        className={isDark ? styles.text : styles.textLight}
        dangerouslySetInnerHTML={{ __html: f_text }}
      ></p>

      <div className={styles.content}>
        {tweet.q_created_at ? (
          <Quote tweet={tweet} isTwitter={isTwitter} />
        ) : tweet.media.length ? (
          <div className={isDark ? styles.cardMedia : styles.cardMediaLight}>
            {Media(tweet.media, isTwitter)}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <p>
          {finalTime} &middot; {localDate} &middot;{' '}
          <span
            className={styles.cardFooterSource}
            dangerouslySetInnerHTML={{ __html: tweet.source }}
          ></span>
        </p>

        <div
          className={
            isDark ? styles.cardFooterInfo : styles.cardFooterInfoLight
          }
        >
          <p style={{ marginRight: '2rem' }}>
            <span
              className={
                isDark ? styles.cardFooterCount : styles.cardFooterCountLight
              }
            >
              {numAbbr.abbreviate(tweet.retweet_count, 1)}
            </span>{' '}
            Retweets and comments{' '}
          </p>

          <p>
            <span
              className={
                isDark ? styles.cardFooterCount : styles.cardFooterCountLight
              }
            >
              {numAbbr.abbreviate(tweet.favorite_count, 1)}
            </span>{' '}
            Likes
          </p>
        </div>
      </div>
    </div>
  );
}
