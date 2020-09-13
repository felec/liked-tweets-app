import { useState } from 'react';
import ReactPlayer from 'react-player';

import { cdn } from '../utils/cdn';
import { New_Media } from '../types/type';
import styles from '../styles/media.module.css';

export default function Media(media: New_Media[]) {
  const [gallery, setGallery] = useState(false);

  const renderMediaType = () => {
    if (media.length === 1) {
      return media.map((m) => {
        switch (m.type) {
          case 'video':
            return (
              <ReactPlayer
                key={m.id_str}
                url={cdn(m.url)}
                loop={true}
                controls={true}
              />
            );
          case 'photo':
            return gallery ? (
              <div onClick={() => setGallery(!gallery)} className={styles.full}>
                {media.map((m) => {
                  return <img src={cdn(m.url)} alt='' />;
                })}
              </div>
            ) : (
              <img
                onClick={() => setGallery(!gallery)}
                key={m.id_str}
                className={styles.photo}
                src={cdn(m.url)}
                alt='pic'
              />
            );
          default:
            break;
        }
      });
    } else if (media.length === 2) {
      return gallery ? (
        <div onClick={() => setGallery(!gallery)} className={styles.full}>
          {media.map((m) => {
            return <img src={cdn(m.url)} alt='' />;
          })}
        </div>
      ) : (
        <div onClick={() => setGallery(!gallery)} className={styles.twoPhoto}>
          <img
            key={media[0].id_str}
            style={{ marginRight: '2px' }}
            className={styles.flexPhoto}
            src={cdn(media[0].url)}
            alt='pic'
          />
          <img
            key={media[1].id_str}
            className={styles.flexPhoto}
            src={cdn(media[1].url)}
            alt='pic 2'
          />
        </div>
      );
    } else if (media.length === 3) {
      return gallery ? (
        <div onClick={() => setGallery(!gallery)} className={styles.full}>
          {media.map((m) => {
            return <img src={cdn(m.url)} alt='' />;
          })}
        </div>
      ) : (
        <div onClick={() => setGallery(!gallery)} className={styles.threePhoto}>
          <img
            key={media[0].id_str}
            style={{ marginRight: '2px' }}
            className={styles.flexThreePhoto}
            src={cdn(media[0].url)}
            alt='pic 1'
          />
          <div className={styles.flexThree}>
            <img
              key={media[1].id_str}
              style={{ marginBottom: '2px' }}
              className={styles.flexPhoto}
              src={cdn(media[1].url)}
              alt='pic 2'
            />
            <img
              key={media[2].id_str}
              className={styles.flexPhoto}
              src={cdn(media[2].url)}
              alt='pic 3'
            />
          </div>
        </div>
      );
    } else if (media.length === 4) {
      return gallery ? (
        <div onClick={() => setGallery(!gallery)} className={styles.full}>
          {media.map((m) => {
            return <img src={cdn(m.url)} alt='' />;
          })}
        </div>
      ) : (
        <div onClick={() => setGallery(!gallery)} className={styles.fourPhoto}>
          <div className={styles.photos}>
            <img
              key={media[0].id_str}
              style={{ marginBottom: '2px', marginRight: '2px' }}
              className={styles.flexPhoto}
              src={cdn(media[0].url)}
              alt='pic 1'
            />
            <img
              key={media[1].id_str}
              className={styles.flexPhoto}
              src={cdn(media[1].url)}
              alt='pic 2'
            />
          </div>
          <div className={styles.photos}>
            <img
              key={media[2].id_str}
              style={{ marginRight: '2px' }}
              className={styles.flexPhoto}
              src={cdn(media[2].url)}
              alt='pic 3'
            />
            <img
              key={media[3].id_str}
              className={styles.flexPhoto}
              src={cdn(media[3].url)}
              alt='pic 4'
            />
          </div>
        </div>
      );
    }
  };

  return <>{renderMediaType()}</>;
}
