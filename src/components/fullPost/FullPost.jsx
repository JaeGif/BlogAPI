import React from 'react';
import Comments from '../comments/Comments';
import Comment from '../comments/Comment';
import style from './fullpost.module.css';

function FullPost({ postObj, toggleFullPost }) {
  const {
    createdAt,
    image,
    like,
    post,
    published,
    comments,
    updatedAt,
    user,
    _id,
  } = postObj;
  return (
    <div className={style.fullScreenContainer}>
      <div
        className={style.modalContainerFullScreenCenter}
        onClick={() => toggleFullPost()}
      >
        <div className={style.paddingWrapper}>
          <span className={style.closeModalBtnContainer}>
            <p className={style.closeModalBtn} onClick={() => toggleFullPost()}>
              &#10005;
            </p>
          </span>
        </div>
        <div className={style.postModalWrapper}>
          <div
            className={style.postModalContainer}
            onClick={(e) => e.stopPropagation()}
          >
            Inner Content
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullPost;
