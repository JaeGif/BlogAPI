import React, { useRef } from 'react';
import style from './newpost.module.css';

function UploadImages({ handleFiles }) {
  const getFile = useRef(null);
  const fileUpload = (ref) => {
    ref.current.click();
  };

  return (
    <>
      <span className={style.headingNewPost}>
        <p>Create New Post</p>
      </span>
      <div className={style.innerPostModalContainer}>
        <img src='./src/assets/favicons/upload.svg' alt='upload img'></img>
        <p className={style.instructionsTxt}>Drag photos here</p>
        <input
          type='file'
          ref={getFile}
          name='image'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e)}
          multiple
        />
        <button
          type='button'
          className={style.selectPhotoBtn}
          onClick={() => fileUpload(getFile)}
        >
          Select from computer
        </button>
      </div>
    </>
  );
}

export default UploadImages;
