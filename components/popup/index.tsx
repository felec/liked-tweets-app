import { useState, useEffect } from 'react';

import { likedTweets } from '../../api';
import styles from './popup.module.css';

export default function Popup() {
  const [isPopup, setIsPopup] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  // If this current popup modal is activated,
  // Send req to backend which will return a new auth url
  useEffect(() => {
    const loginUser = async () => {
      try {
        const res = await likedTweets.get('auth/login', {
          withCredentials: true,
        });

        setUrl(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (isPopup) {
      loginUser();
    }
  }, [isPopup]);

  return (
    <>
      <img
        onClick={() => setIsPopup(!isPopup)}
        className={styles.user}
        src='../images/user.png'
        alt='user-avatar'
      />

      {isPopup && (
        <div onClick={() => setIsPopup(false)} className={styles.backdrop}>
          <div onClick={(e) => e.stopPropagation()} className={styles.popup}>
            <img
              className={styles.icon}
              src='../images/twitter-brands.svg'
              alt='twitter logo'
            />
            <div
              onClick={async () => {
                try {
                  // If auth token and url is received from api
                  // Manually navigate to Twitter Oauth page
                  url ? (window.location.href = url) : null;
                } catch (err) {
                  console.log(err);
                }
              }}
              className={styles.login}
            >
              Login with Twitter
            </div>
          </div>
        </div>
      )}
    </>
  );
}
