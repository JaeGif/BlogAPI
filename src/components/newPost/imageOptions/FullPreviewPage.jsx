import React from 'react';
import PreviewImage from '../PreviewImage';
import ImageOptions from '../ImageOptions';
import style from '../newpost.module.css';

function FullPreviewPage({
  images,
  returnToUpload,
  nextStep,
  handleFilters,
  filter,
}) {
  return (
    <>
      <span className={style.headingPreviewEdits}>
        <img
          className={style.returnArrow}
          alt='back arrow'
          src='./src/assets/favicons/redo.svg'
          onClick={() => returnToUpload()}
        ></img>
        <p>Edit</p>
        <p onClick={() => nextStep()} className={style.continueNewPostText}>
          Next
        </p>
      </span>
      <div className={style.postPreviewContainer}>
        <PreviewImage filter={filter} images={images} />
        <ImageOptions handleFilters={handleFilters} />
      </div>
    </>
  );
}

export default FullPreviewPage;
