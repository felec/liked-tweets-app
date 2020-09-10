import NumAbbr from 'number-abbreviate';

import Quote from '../quote';
import { cdn } from '../../utils/cdn';
import { New_Tweet } from '../../types/type';
import styles from './card.module.css';
import Media from '../../utils/media';

export default function Card({ tweet }: { tweet: New_Tweet }) {
  const numAbbr = new NumAbbr(['K', 'M', 'B', 'T']);

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

  const truncateDescr = (desc: string) => {
    if (desc.length > 85) {
      return `${desc.slice(0, 86)}...`;
    }
    return desc;
  };

  const dateTime = date.toLocaleTimeString();
  const timeList = dateTime.split(' ');
  const time = timeList[0].split(':');
  const finalTime = `${time[0]}:${time[1]} ${timeList[1]}`;

  const local = date.toLocaleDateString();
  const localList = local.split('/');
  const year = localList[2].slice(0, 2);
  const localDate = `${localList[0]}/${localList[1]}/${year}`;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          src={cdn(tweet.profile_image_url_https)}
          className={styles.avatar}
          alt='profile picture'
        />

        <div className={styles.cardHeaderInfo}>
          <h2 className={styles.name}>
            {tweet.name}{' '}
            {tweet.verified && (
              <img
                className={styles.verified}
                src='../images/verified-light.png'
              />
            )}
          </h2>{' '}
          <h3 className={styles.screenName}>@{tweet.screen_name}</h3>
        </div>
      </div>

      <div className={styles.profilePeek}>
        <img
          className={styles.avatar}
          src={cdn(tweet.profile_image_url_https)}
          alt='profile pic'
        />
        <h2 className={styles.name}>
          {tweet.name}{' '}
          {tweet.verified && (
            <img
              className={styles.verified}
              src='../images/verified-light.png'
            />
          )}
        </h2>{' '}
        <h3 className={styles.screenName}>@{tweet.screen_name}</h3>
        <p>{truncateDescr(tweet.description)}</p>
        <div style={{ display: 'flex' }}>
          <p style={{ marginRight: '2rem' }}>
            <span className={styles.cardFooterCount}>
              {numAbbr.abbreviate(tweet.friends_count, 1)}
            </span>{' '}
            Following{' '}
          </p>

          <p>
            <span className={styles.cardFooterCount}>
              {numAbbr.abbreviate(tweet.followers_count, 1)}
            </span>{' '}
            Followers
          </p>
        </div>
      </div>

      <p
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: f_text }}
      ></p>

      <div className={styles.content}>
        {tweet.q_created_at ? (
          <Quote tweet={tweet} />
        ) : tweet.media.length ? (
          <div className={styles.cardMedia}>{Media(tweet.media)}</div>
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

        <div className={styles.cardFooterInfo}>
          <p style={{ marginRight: '2rem' }}>
            <span className={styles.cardFooterCount}>
              {numAbbr.abbreviate(tweet.retweet_count, 1)}
            </span>{' '}
            Retweets and comments{' '}
          </p>

          <p>
            <span className={styles.cardFooterCount}>
              {numAbbr.abbreviate(tweet.favorite_count, 1)}
            </span>{' '}
            Likes
          </p>
        </div>
      </div>
    </div>
  );
}
