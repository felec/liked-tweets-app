import { useState } from 'react';
import ReactPlayer from 'react-player';

import { cdn } from '../utils/cdn';
import { NewMedia } from '../types/type';
import styles from '../styles/media.module.css';
import Modal from '../components/modal';

export default function Media(media: NewMedia[], isTwitter: boolean) {
  const [isModal, setIsModal] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [size, setSize] = useState<number[] | null>(null);

  const closeModal = () => {
    setIsModal(false);
  };

  const openModal = (url: string, size: number[]) => {
    setUrl(url);
    setSize(size);
    setIsModal(true);
  };

  const renderMediaType = () => {
    if (media.length === 1) {
      return media.map((m) => {
        switch (m.type) {
          case 'video':
            return (
              <ReactPlayer
                key={m.id_str}
                url={isTwitter ? m.url : cdn(m.url)}
                loop={true}
                controls={true}
              />
            );
          case 'photo':
            return (
              <img
                key={m.id_str}
                onClick={() => openModal(m.url, m.size)}
                className={styles.photo}
                src={isTwitter ? m.url : cdn(m.url)}
                alt='tweet pic'
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
            key={media[1].id_str}
            onClick={() => openModal(media[1].url, media[1].size)}
            style={{ marginRight: '2px' }}
            className={styles.flexPhoto}
            src={isTwitter ? media[1].url : cdn(media[1].url)}
            alt='pic1'
          />

          <img
            key={media[0].id_str}
            onClick={() => openModal(media[0].url, media[0].size)}
            style={{ marginRight: '2px' }}
            className={styles.flexPhoto}
            src={isTwitter ? media[0].url : cdn(media[0].url)}
            alt='pic2'
          />
        </div>
      );
    } else if (media.length === 3) {
      return (
        <div className={styles.gridThree}>
          <img
            key={media[0].id_str}
            onClick={() => openModal(media[0].url, media[0].size)}
            src={isTwitter ? media[0].url : cdn(media[0].url)}
            className={styles.gridPhoto}
            style={{
              height: '100%',
              width: '50%',
              gridRow: '1 / span 2',
            }}
            alt='pic 1'
          />

          <img
            key={media[1].id_str}
            onClick={() => openModal(media[1].url, media[1].size)}
            src={isTwitter ? media[1].url : cdn(media[1].url)}
            className={styles.gridPhoto}
            alt='pic 2'
          />
          <img
            key={media[2].id_str}
            onClick={() => openModal(media[2].url, media[2].size)}
            src={isTwitter ? media[2].url : cdn(media[2].url)}
            className={styles.gridPhoto}
            alt='pic 3'
          />
        </div>
      );
    } else if (media.length === 4) {
      return (
        <div className={styles.fourPhoto}>
          <div className={styles.photos}>
            <img
              key={media[0].id_str}
              onClick={() => openModal(media[0].url, media[0].size)}
              style={{ marginBottom: '2px', marginRight: '2px' }}
              className={styles.flexPhoto}
              src={isTwitter ? media[0].url : cdn(media[0].url)}
              alt='pic 1'
            />
            <img
              key={media[1].id_str}
              onClick={() => openModal(media[1].url, media[1].size)}
              className={styles.flexPhoto}
              src={isTwitter ? media[1].url : cdn(media[1].url)}
              alt='pic 2'
            />
          </div>
          <div className={styles.photos}>
            <img
              key={media[2].id_str}
              onClick={() => openModal(media[2].url, media[2].size)}
              style={{ marginRight: '2px' }}
              className={styles.flexPhoto}
              src={isTwitter ? media[2].url : cdn(media[2].url)}
              alt='pic 3'
            />
            <img
              key={media[3].id_str}
              onClick={() => openModal(media[3].url, media[3].size)}
              className={styles.flexPhoto}
              src={isTwitter ? media[3].url : cdn(media[3].url)}
              alt='pic 4'
            />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderMediaType()}{' '}
      {isModal && (
        <Modal url={url} size={size} cb={closeModal} isTwitter={isTwitter} />
      )}
    </>
  );
}
