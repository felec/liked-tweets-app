import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';

import styles from './modal.module.css';

export default function Modal() {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  const loginUser = () => {
    // axios.get('https://safe-taiga-98795.herokuapp.com/login');
    router.push('/user');
  };

  return modal ? (
    <div onClick={() => setModal(false)} className={styles.backdrop}>
      <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
        <img
          className={styles.icon}
          src='../images/twitter-brands.svg'
          alt='logo'
        />
        <a
          onClick={loginUser}
          className={styles.login}
          href='javascript:void(0)'
        >
          Login with Twitter
        </a>
      </div>
    </div>
  ) : (
    <img
      onClick={() => setModal(!modal)}
      className={styles.user}
      src='../images/user.png'
      alt=''
    />
  );
}
