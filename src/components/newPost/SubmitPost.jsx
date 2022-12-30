import React from 'react';
import style from './newpost.module.css';

function SubmitPost({ prevStep, submit, setPost }) {
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
        <p onClick={submit} className={style.continueNewPostText}>
          Submit
        </p>
      </span>
      <textarea
        onChange={() => setPost()}
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
