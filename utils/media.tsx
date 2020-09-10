import { useState } from 'react';
import ReactPlayer from 'react-player';

import { cdn } from '../utils/cdn';
import { New_Media } from '../types/type';
import styles from '../styles/media.module.css';

export default function Media(media: New_Media[]) {
  const [modal, setmodal] = useState(false);

  // const imageModal = (image: New_Media) => {
  //   return (
  //     <div className={styles.modal}>
  //       <img className={styles.modalImage} src={cdn(image.url)} alt='photo' />
  //     </div>
  //   );
  // };

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
            return (
              <img
                key={m.id_str}
                className={styles.photo}
                src={cdn(m.url)}
                alt='photo'
              />
            );
          default:
            break;
        }
      });
    } else if (media.length === 2) {
      return (
        <div className={styles.twoPhoto}>
          <img
            key={media[0].id_str}
            style={{ marginRight: '2px' }}
            className={styles.flexPhoto}
            src={cdn(media[0].url)}
            alt='photo'
          />
          <img
            key={media[1].id_str}
            className={styles.flexPhoto}
            src={cdn(media[1].url)}
            alt='photo'
          />
        </div>
      );
    } else if (media.length === 3) {
      return (
        <div className={styles.twoPhoto}>
          <img
            key={media[0].id_str}
            style={{ marginRight: '2px' }}
            className={styles.flexThreePhoto}
            src={cdn(media[0].url)}
            alt='photo'
          />
          <div className={styles.flexThree}>
            <img
              key={media[1].id_str}
              style={{ marginBottom: '2px' }}
              className={styles.flexPhoto}
              src={cdn(media[1].url)}
              alt='photo'
            />
            <img
              key={media[2].id_str}
              className={styles.flexPhoto}
              src={cdn(media[2].url)}
              alt='photo'
            />
          </div>
        </div>
      );
    } else if (media.length === 4) {
      return (
        <div className={styles.fourPhoto}>
          <div className={styles.photos}>
            <img
              key={media[0].id_str}
              style={{ marginBottom: '2px', marginRight: '2px' }}
              className={styles.flexPhoto}
              src={cdn(media[0].url)}
              alt='photo'
            />
            <img
              key={media[1].id_str}
              className={styles.flexPhoto}
              src={cdn(media[1].url)}
              alt='photo'
            />
          </div>
          <div className={styles.photos}>
            <img
              key={media[2].id_str}
              style={{ marginRight: '2px' }}
              className={styles.flexPhoto}
              src={cdn(media[2].url)}
              alt='photo'
            />
            <img
              key={media[3].id_str}
              className={styles.flexPhoto}
              src={cdn(media[3].url)}
              alt='photo'
            />
          </div>
        </div>
      );
    }
  };

  return <>{renderMediaType()}</>;
}
