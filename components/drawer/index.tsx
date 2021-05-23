import { useState } from 'react';
import NumAbbr from 'number-abbreviate';

import styles from './drawer.module.css';
import axios from 'axios';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function Drawer() {
  const numAbbr = new NumAbbr(['K', 'M', 'B', 'T']);
  const [drawer, setDrawer] = useState(false);
  const { user, setUser } = useUser();
  const { isAuth, setIsAuth } = useAuth();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const defAvatar = '../images/user.png';

  const logoutUser = async () => {
    try {
      await axios(
        'https://peaceful-reef-54258.herokuapp.com/api/v1/auth/logout',
        { withCredentials: true }
      );

      setUser(null);
      setIsAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

  return drawer ? (
    <div onClick={() => setDrawer(false)} className={styles.backdrop}>
      <div className={isDark ? styles.drawer : styles.drawerLight}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <a
            onClick={logoutUser}
            className={styles.logout}
            href='javaScript:void(0);'
          >
            Logout
          </a>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              className={styles.avatar}
              src={user.profile_image_url_https}
              alt='profile pic'
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '1rem',
              }}
            >
              <div style={{ display: 'flex' }}>
                <h3 className={isDark ? styles.name : styles.nameLight}>
                  {user.name}
                </h3>
                {user.verified && (
                  <img
                    className={styles.verified}
                    src='../images/verified-light.png'
                  />
                )}
              </div>
              <h3 className={styles.screenName}>@{user.screen_name}</h3>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              margin: '.5rem 0',
            }}
          >
            <p
              className={
                isDark ? styles.cardFooterCount : styles.cardFooterCountLight
              }
              style={{ marginRight: '1rem' }}
            >
              {numAbbr.abbreviate(user.friends_count, 2)} <br />{' '}
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'normal',
                  color: '#82929f',
                }}
              >
                Following
              </span>
            </p>

            <p
              className={
                isDark ? styles.cardFooterCount : styles.cardFooterCountLight
              }
              style={{ marginRight: '1rem' }}
            >
              {numAbbr.abbreviate(user.followers_count, 2)} <br />{' '}
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'normal',
                  color: '#82929f',
                }}
              >
                Followers
              </span>
            </p>

            <p
              className={
                isDark ? styles.cardFooterCount : styles.cardFooterCountLight
              }
            >
              {numAbbr.abbreviate(user.favourites_count, 2)} <br />{' '}
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'normal',
                  color: '#82929f',
                }}
              >
                Favorites
              </span>
            </p>
          </div>

          <p className={isDark ? styles.desc : styles.descLight}>
            {user.description}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <img
      onClick={() => setDrawer(!drawer)}
      className={styles.avatar}
      src={user ? user.profile_image_url_https : defAvatar}
      alt='user-avatar'
    />
  );
}
