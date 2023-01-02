import React, { useState } from 'react';
import CommentLoadingIcon from '../comments/addComment/utility/CommentLoadingIcon';
import style from './newpost.module.css';

function SubmitPost({ prevStep, submit, addPost, isSubmitting }) {
  return (
    <div>
      <span className={style.headingPreviewEdits}>
        <img
          className={style.returnArrow}
          alt='back arrow'
          src='./src/assets/favicons/redo.svg'
          onClick={() => prevStep()}
        ></img>
        <p>Edit</p>
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
      <textarea
        onChange={(e) => addPost(e)}
        name='post'
        placeholder='Add a caption?'
      ></textarea>
      <span>
        <label htmlFor='altText'>Accessibility</label>
        <input name='altText' type='text' placeholder='alt-text' />
      </span>
    </div>
  );
}

export default SubmitPost;
