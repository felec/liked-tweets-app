import React, { useEffect } from 'react';

import ReactDOM from 'react-dom';
import { cdn } from '../../utils/cdn';
import styles from './modal.module.css';

const Modal = ({
  url,
  size,
  cb,
  isTwitter,
}: {
  url: string;
  size: number[];
  cb: Function;
  isTwitter: boolean;
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);

  return ReactDOM.createPortal(
    <div onClick={() => cb()} className={styles.backdrop}>
      {/* Scale down and maintain aspect ratio of image */}
      <img
        height={size[0] / 1.5}
        width={size[1] / 1.5}
        className={styles.src}
        src={isTwitter ? url : cdn(url)}
        alt='tweet pic'
      />
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
