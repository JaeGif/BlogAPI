import React, { useState } from 'react';
import PreviewImage from '../PreviewImage';
import ImageOptions from '../ImageOptions';
import style from '../newpost.module.css';

function FullPreviewPage({
  images,
  returnToUpload,
  nextStep,
  handleFilters,
  filter,
  isVideoPreview,
}) {
  const [imageIndex, setImageIndex] = useState(0);

  const handleIncIndex = () => {
    setImageIndex(imageIndex + 1);
  };
  const handleDecIndex = () => {
    setImageIndex(imageIndex - 1);
  };

  return (
    <>
      <span className={style.headingPreviewEdits}>
        <img
          className={style.returnArrow}
          alt='back arrow'
          src='/assets/favicons/redo.svg'
          onClick={() => returnToUpload()}
        ></img>
        <p>Edit</p>
        <p onClick={() => nextStep()} className={style.continueNewPostText}>
          Next
        </p>
      </span>
      <div className={style.postPreviewContainer}>
        <PreviewImage
          imageIndex={imageIndex}
          handleIncIndex={handleIncIndex}
          handleDecIndex={handleDecIndex}
          filter={filter}
          images={images}
          isVideoPreview={isVideoPreview}
        />
        <ImageOptions
          imageIndex={imageIndex}
          handleFilters={handleFilters}
          currentSelectedFilter={filter}
        />
      </div>
    </>
  );
}

export default FullPreviewPage;
