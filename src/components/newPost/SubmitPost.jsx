import React, { useState } from 'react';
import CommentLoadingIcon from '../comments/addComment/utility/CommentLoadingIcon';
import style from './newpost.module.css';
import PreviewImage from './PreviewImage';

function SubmitPost({
  prevStep,
  submit,
  addPost,
  isSubmitting,
  changeAlt,
  images,
  filter,
}) {
  return (
    <div className={style.submitContainer}>
      <span className={style.headingSubmitPost}>
        <img
          className={style.returnArrow}
          alt='back arrow'
          src='./src/assets/favicons/redo.svg'
          onClick={() => prevStep()}
        ></img>
        <p>Create new post</p>
        <div>
          {isSubmitting ? (
            <CommentLoadingIcon />
          ) : (
            <p
              onClick={() => {
                submit();
              }}
              className={style.continueNewPostText}
            >
              Submit
            </p>
          )}
        </div>
      </span>
      <div className={style.innerSubmitContainer}>
        <PreviewImage images={images} filter={filter} />
        <div className={style.postFormContainer}>
          <textarea
            className={style.postInput}
            onChange={(e) => addPost(e)}
            name='post'
            placeholder='Add a caption?'
          ></textarea>
          <span>
            <label htmlFor='altText'>Accessibility</label>
            <input
              onChange={(e) => changeAlt(e)}
              name='altText'
              type='text'
              placeholder='alt-text'
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default SubmitPost;
