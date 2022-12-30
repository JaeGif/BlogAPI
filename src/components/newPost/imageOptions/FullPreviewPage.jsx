import React from 'react';
import PreviewImage from '../PreviewImage';
import ImageOptions from '../ImageOptions';
import style from '../newpost.module.css';

function FullPreviewPage({ images, returnToUpload, nextStep }) {
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
        <PreviewImage images={images} />
        <ImageOptions />
      </div>
    </>
  );
}

export default FullPreviewPage;
