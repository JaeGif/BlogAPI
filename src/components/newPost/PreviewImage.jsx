import React, { useEffect } from 'react';
import style from './previewimage.module.css';
import uniqid from 'uniqid';
import ImageContent from './Image';

function PreviewImage({ images, imageData, isVideoPreview, imageIndex }) {
  return (
    <div className={style.previewImagesContainer}>
      {images.map((image, idx) => {
        return (
          <ImageContent
            idx={idx}
            image={image}
            isVideoPreview={isVideoPreview}
            imageData={imageData}
          />
        );
      })}
    </div>
  );
}

export default PreviewImage;
