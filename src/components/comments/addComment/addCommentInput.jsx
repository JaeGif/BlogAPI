import React, { useState } from 'react';
import style from './AddCommentInput.module.css';

function AddCommentInput() {
  const [isValue, setIsValue] = useState(false);
  return (
    <span className={style.commentAreaContainer}>
      <form className={style.formElement}>
        <textarea
          className={style.commentInput}
          type='text'
          placeholder='Add a comment...'
        ></textarea>
        <button className={style.postBtn}>Post</button>
      </form>
    </span>
  );
}

export default AddCommentInput;
