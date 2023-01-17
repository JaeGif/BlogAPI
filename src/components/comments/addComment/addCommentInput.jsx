import React, { useContext, useState } from 'react';
import { ApiContext, UserContext } from '../../../App';
import style from './AddCommentInput.module.css';
import CommentLoadingIcon from './utility/CommentLoadingIcon.jsx';

function AddCommentInput({ post, updateParentPost }) {
  const user = useContext(UserContext);
  const apiURL = useContext(ApiContext);

  const [isValue, setIsValue] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [comment, setComment] = useState('');

  const commentRoute = `${apiURL}/api/posts/${post}`;

  const checkValue = (e) => {
    if (e.target.value !== '') {
      setIsValue(true);
    } else {
      setIsValue(false);
    }
  };
  const setCommentHandler = (e) => {
    setComment(e.target.value);
  };
  const resetData = () => {
    setComment('');
  };
  const submitComment = () => {
    let data = new URLSearchParams(); // form sending x-www-form-urlencoded data
    data.append('user', JSON.stringify(user));
    data.append('comment', comment);
    fetch(commentRoute, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'cors',
    }).then(() => {
      resetData();
      setSubmitting(false);
      updateParentPost();
    });
  };

  return (
    <span className={style.commentAreaContainer}>
      <div className={style.formContainer}>
        <textarea
          onChange={(e) => {
            checkValue(e);
            setCommentHandler(e);
          }}
          className={style.commentInput}
          name='comment'
          type='text'
          placeholder='Add a comment...'
        ></textarea>

        {submitting ? (
          <div className={style.loadingIconContainer}>
            <CommentLoadingIcon />
          </div>
        ) : (
          <button
            type='button'
            onClick={() => {
              submitComment();
              setSubmitting(true);
            }}
            className={
              isValue ? `${style.postBtn} ${style.activePost}` : style.postBtn
            }
          >
            Post
          </button>
        )}
      </div>
    </span>
  );
}

export default AddCommentInput;
