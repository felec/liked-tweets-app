import { cdn } from '../../utils/cdn';
import { NewTweet } from '../../types/type';
import styles from './quote.module.css';
import { truncateNames } from '../../utils/truncate-names';
import Media from '../../utils/media';
import { useTheme } from '../../contexts/ThemeContext';

interface ContentProps {
  tweet: NewTweet;
  isTwitter: boolean;
}

export default function Quote({ tweet, isTwitter }: ContentProps) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  let q_text = tweet.q_full_text;

  const raw = tweet.q_created_at.split('-');
  const fixDate = raw[2].slice(0, 2);
  const restDate = raw[2].slice(3, -1);
  const finalStamp = `${raw[0]}-${raw[1]}-${fixDate}T${restDate}`;

  const created = Date.parse(finalStamp);
  const date = new Date(created);
  const local = date.toLocaleDateString();
  const localList = local.split('/');
  const year = localList[2].slice(0, 2);
  const localDate = `${localList[0]}/${localList[1]}/${year}`;

  if (q_text.includes('http')) {
    const qtList = q_text.split(' ');
    q_text = qtList
      .filter((qt) => {
        return !qt.includes('http');
      })
      .join(' ');
  }

  const quoteClassName = () => {
    if (tweet.media.length) {
      return tweet.media[0]?.type === 'photo'
        ? isDark
          ? styles.quotePhoto
          : styles.quotePhotoLight
        : isDark
        ? styles.quote
        : styles.quoteLight;
    }
    return isDark ? styles.quoteNoPhoto : styles.quoteNoPhotoLight;
  };

  const themeColor = isDark ? '#15202b' : '#FFF';

  return (
    <div className={quoteClassName()}>
      <div
        className={styles.quoteHeader}
        style={{ backgroundColor: themeColor }}
      >
        <div className={styles.quoteInfo}>
          <img
            src={cdn(tweet.q_profile_image_url_https)}
            alt='avatar'
            className={styles.quoteAvatar}
          />
          {truncateNames(tweet, isDark)}
          <p className={styles.quoteDate}>&middot; {localDate}</p>
        </div>

        <p
          className={isDark ? styles.quoteText : styles.quoteTextLight}
          dangerouslySetInnerHTML={{ __html: q_text }}
        ></p>
      </div>

      <div key={tweet.id_str} className={styles.quoteMedia}>
        {Media(tweet.media, isTwitter)}
      </div>
    </div>
  );
}
