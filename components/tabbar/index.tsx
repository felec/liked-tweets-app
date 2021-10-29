import { useState } from 'react';

import Link from 'next/link';

import { useTheme } from '../../contexts/ThemeContext';
import { useLoading } from '../../contexts/LoadContext';
import styles from '../../styles/home.module.css';

function Tabbar({ name }: { name: string }) {
  const [selected, setSelected] = useState(name);
  const { theme } = useTheme();
  const { setIsLoading } = useLoading();
  const isDark = theme === 'dark';
  const pages = ['News', '', 'Sports'];

  const handleSelected = (name: string) => {
    setIsLoading(true);
    setSelected(name);
  };

  const renderTabs = () => {
    return pages.map((n) => {
      if (n === selected) {
        return (
          <Link key={n} href='#'>
            <a className={isDark ? styles.selected : styles.buttonLight}>
              {n === '' ? 'Trending' : n}
            </a>
          </Link>
        );
      } else {
        return (
          <Link key={n} href={`/${n.toLowerCase()}`}>
            <a
              onClick={() => handleSelected(n)}
              className={isDark ? styles.button : styles.buttonLight}
            >
              {n === '' ? 'Trending' : n}
            </a>
          </Link>
        );
      }
    });
  };

  return (
    <div className={isDark ? styles.navBar : styles.navBarLight}>
      {renderTabs()}
    </div>
  );
}

export default Tabbar;
