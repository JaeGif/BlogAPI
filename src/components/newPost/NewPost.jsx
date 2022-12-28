import React from 'react';
import style from './newpost.module.css';

// This component will contain a select photo page, that changes to an
// add caption page if a photo is uploaded.
function NewPost() {
  return (
    <div className={style.modalContainerFullScreenCenter}>
      <div className={style.paddingWrapper}>
        <span className={style.closeModalBtnContainer}>
          <p className={style.closeModalBtn}>&#10005;</p>
        </span>
      </div>
      <div className={style.postModalWrapper}>
        <div className={style.postModalContainer}>
          <span className={style.headingNewPost}>Create New Post</span>
          <div className={style.innerPostModalContainer}>
            <img alt='upload img'></img>
            <p className={style.instructionsTxt}>Drag photos here</p>
            <button type='button' className={style.selectPhotoBtn}>
              Select from computer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
