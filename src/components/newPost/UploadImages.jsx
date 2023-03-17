import React, { useRef, useContext, useEffect, useState } from 'react';

import { PathContext } from '../../App';
import DragDrop from './DragDrop';
import style from './newpost.module.css';

function UploadImages({ handleFiles }) {
  const getFile = useRef(null);
  const basePath = useContext(PathContext);
  const fileUpload = (ref) => {
    ref.current.click();
  };
  const width = window.innerWidth;
  const [mediaMobile, setMediaMobile] = useState(false);

  useEffect(() => {
    if (width <= 750) {
      setMediaMobile(true);
    } else {
      setMediaMobile(false);
    }
  });
  return (
    <>
      <span className={style.headingNewPost}>
        <p>{mediaMobile ? 'Create' : 'Create New Post'}</p>
      </span>
      <div className={style.innerPostModalContainer}>
        <img
          src={`${basePath}/assets/favicons/upload.svg`}
          alt='upload img'
        ></img>
        <DragDrop handleChange={handleFiles} />
        <p className={style.instructionsTxt}>Drag photos here</p>
        <input
          type='file'
          ref={getFile}
          name='image'
          accept='image/jpg, image/jpeg, image/png, video/mp4'
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
          multiple
        />
        <button
          type='button'
          className={`${style.selectPhotoBtn}`}
          onClick={() => fileUpload(getFile)}
        >
          {mediaMobile ? 'Select Files' : 'Select from computer'}
        </button>
      </div>
    </>
  );
}

export default UploadImages;
