import React, { useContext, useEffect, useState } from 'react';
import PreviewImage from '../PreviewImage';
import ImageOptions from '../ImageOptions';
import style from '../newpost.module.css';
import { PathContext, ProgressContext } from '../../../App';

function FullPreviewPage({
  images,
  returnToUpload,
  nextStep,
  handleFilters,
  filter,
  isVideoPreview,
  imageData,
  imageIndex,
  handleDecIndex,
  handleIncIndex,
}) {
  const basePath = useContext(PathContext);
  return (
    <>
      <span className={style.headingPreviewEdits}>
        <img
          className={style.returnArrow}
          alt='back arrow'
          src={`${basePath}/assets/favicons/redo.svg`}
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
          imageData={imageData}
          images={images}
          isVideoPreview={isVideoPreview}
        />
        <ImageOptions
          imageIndex={imageIndex}
          imageData={imageData}
          handleFilters={handleFilters}
          currentSelectedFilter={filter}
        />
      </div>
    </>
  );
}

export default FullPreviewPage;
