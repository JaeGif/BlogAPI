import React, { useState, useEffect } from 'react';
import style from './newpost.module.css';
import PreviewImage from './PreviewImage';
import UploadImages from './UploadImages';
import ImageOptions from './ImageOptions';

// This component will contain a select photo page, that changes to an
// add caption page if a photo is uploaded.
function NewPost({ newPostModal }) {
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  const handleFiles = (e) => {
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    alert(
      'DEV ALERT RED CODE RED CODE: Selected images are not of valid type!'
    );
  };

  useEffect(() => {
    const images = [],
      fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
    };
  }, [imageFiles]);

  return (
    <div
      className={style.modalContainerFullScreenCenter}
      onClick={() => newPostModal()}
    >
      <div className={style.paddingWrapper}>
        <span className={style.closeModalBtnContainer}>
          <p className={style.closeModalBtn} onClick={() => newPostModal()}>
            &#10005;
          </p>
        </span>
      </div>
      <div className={style.postModalWrapper}>
        <div
          className={
            images.length > 0
              ? style.postPreviewContainer
              : style.postModalContainer
          }
          onClick={(e) => e.stopPropagation()}
        >
          {images.length > 0 ? (
            <>
              <PreviewImage images={images} />
              <ImageOptions />
            </>
          ) : (
            <UploadImages handleFiles={handleFiles} />
          )}
        </div>
      </div>
    </div>
  );
}

export default NewPost;
