import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

import Modal from './modal/modal';
import styles from './layout.module.css';

export const siteTitle = 'Liked Tweets';

export default function Layout({ children }) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const router = useRouter();

  const handleSearchQueryInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='The most liked tweets on Twitter' />
        <meta
          property='og:image'
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
      </Head>
      <div className={styles.headerDiv}>
        <div className={styles.leftHeader}>
          <header className={styles.h1}>
            <Link href='/'>
              <h1 style={{ cursor: 'pointer' }}>LT</h1>
            </Link>
          </header>
          <form onSubmit={handleSearchSubmit} className={styles.container}>
            <input
              className={styles.headerInput}
              type='text'
              placeholder='Search for a tweet...'
              maxLength={40}
              value={searchQuery}
              onChange={handleSearchQueryInput}
            />
          </form>
        </div>
        <Modal />
      </div>

      <main>{children}</main>
    </div>
  );
}
