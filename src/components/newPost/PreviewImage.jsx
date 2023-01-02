import React from 'react';
import style from './previewimage.module.css';

function PreviewImage({ images, filter }) {
  return (
    <div className={style.previewImagesContainer}>
      {images.map((image, idx) => {
        return (
          <div key={idx} className={style.previewImageWrapper}>
            <img
              className={`${style.previewImage} ${filter}`}
              src={image}
              alt='Optional Alt txt'
            />
          </div>
        );
      })}
    </div>
  );
}

export default PreviewImage;
