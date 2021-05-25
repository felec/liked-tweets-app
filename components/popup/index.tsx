import { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './popup.module.css';

export default function Popup() {
  const [isPopup, setIsPopup] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const loginUser = async () => {
      try {
        const res = await axios(
          'https://peaceful-reef-54258.herokuapp.com/api/v1/auth/login',
          { withCredentials: true }
        );

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
