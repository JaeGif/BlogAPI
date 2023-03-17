import React, { useEffect, useState, useRef } from 'react';
import style from './previewimage.module.css';

function ImageContent({
  image,
  isVideoPreview,
  idx,
  imageData,
  isSubmit = false,
}) {
  const [previewFilter, setPreviewFilter] = useState('');
  console.log(isSubmit);
  useEffect(() => {
    for (let i = 0; i < imageData.length; i++) {
      if (imageData[i].index === idx) {
        setPreviewFilter(imageData[i].filter);
        break;
      }
    }
  }, [imageData]);

  return (
    <div
      key={idx}
      className={
        isSubmit
          ? `${style.previewImageWrapper} ${style.imageFromSubmit}`
          : style.previewImageWrapper
      }
    >
      {isVideoPreview ? (
        <video className={`${style.previewImage} ${previewFilter}`} controls>
          <source src={image}></source>
        </video>
      ) : (
        <img
          className={`${style.previewImage} ${previewFilter}`}
          src={image}
          alt='Optional Alt txt'
        />
      )}
    </div>
  );
}

export default ImageContent;
