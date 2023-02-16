import React, { useEffect, useState, useRef } from 'react';
import style from './previewimage.module.css';
import { DependencyList } from 'react';

function ImageContent({ image, isVideoPreview, idx, imageData }) {
  const [previewFilter, setPreviewFilter] = useState('');
  const useDeepCompare = () => {
    const ref = useRef();
    if (!isEqual(ref.current, value)) {
      ref.current = value;
    }
    return ref.current;
  };
  console.log(imageData);
  useEffect(() => {
    console.log(imageData);
    for (let i = 0; i < imageData.length; i++) {
      console.log(idx, imageData[i]);

      if (imageData[i].index === idx) {
        setPreviewFilter(imageData[i].filter);
        break;
      }
    }
    console.log(previewFilter);
  }, [imageData]);

  return (
    <div key={idx} className={style.previewImageWrapper}>
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
