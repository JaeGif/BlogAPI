import React, { useRef } from 'react';
import style from './newpost.module.css';

// This component will contain a select photo page, that changes to an
// add caption page if a photo is uploaded.
function NewPost({ newPostModal }) {
  const getFile = useRef(null);
  const fileUpload = (ref) => {
    ref.current.click();
  };
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
          className={style.postModalContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <span className={style.headingNewPost}>Create New Post</span>
          <div className={style.innerPostModalContainer}>
            <img src='./src/assets/favicons/upload.svg' alt='upload img'></img>
            <p className={style.instructionsTxt}>Drag photos here</p>
            <input type='file' ref={getFile} style={{ display: 'none' }} />
            <button
              type='button'
              className={style.selectPhotoBtn}
              onClick={() => fileUpload(getFile)}
            >
              Select from computer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
