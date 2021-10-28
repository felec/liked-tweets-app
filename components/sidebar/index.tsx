import { cdn } from '../../utils/cdn';
import { TweetUser } from '../../types/type';
import styles from './sidebar.module.css';
import { useTheme } from '../../contexts/ThemeContext';

interface SidebarProps {
  data: TweetUser[];
}

export default function SideBar(props: SidebarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div>
      <h2 className={isDark ? styles.sidebarTitle : styles.sidebarTitleLight}>
        Top Tweeters
      </h2>
      <ul
        style={{
          listStyle: 'none',
          margin: '0',
          padding: '0',
        }}
      >
        {props.data.map((t, idx) => {
          return (
            <li
              key={idx}
              style={{
                display: 'flex',
                marginBottom: '2.5rem',
              }}
            >
              <img
                src={cdn(t.profile_image_url_https)}
                className={styles.avatar}
                alt='profile picture'
              />
              <h3 className={isDark ? styles.name : styles.nameLight}>
                @{t.screen_name}
              </h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
