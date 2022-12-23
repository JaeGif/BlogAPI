import React, { useState } from 'react';
import style from './AddCommentInput.module.css';

function AddCommentInput() {
  const [isValue, setIsValue] = useState(false);

  function checkValue(e) {
    if (e.target.value !== '') {
      setIsValue(true);
    } else {
      setIsValue(false);
    }
  }
  return (
    <span className={style.commentAreaContainer}>
      <form className={style.formElement}>
        <textarea
          onChange={checkValue}
          className={style.commentInput}
          type='text'
          placeholder='Add a comment...'
        ></textarea>
        <button
          className={
            isValue ? `${style.postBtn} ${style.activePost}` : style.postBtn
          }
        >
          Post
        </button>
      </form>
    </span>
  );
}

export default AddCommentInput;
