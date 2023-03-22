import { useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState, useRef } from 'react';
import { ApiContext, TokenContext, UserContext } from '../../../App';
import style from './AddCommentInput.module.css';
import CommentLoadingIcon from './utility/CommentLoadingIcon.jsx';

function AddCommentInput({ post, updateParentPost }) {
  const user = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);
  const ref = useRef(null);
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
    ref.current.value = '';
  };
  const submitComment = async () => {
    let data = new URLSearchParams(); // form sending x-www-form-urlencoded data
    data.append('user', JSON.stringify(user));
    data.append('comment', comment);
    console.log(ref.current);
    resetData();
    const res = await fetch(commentRoute, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: 'Bearer' + ' ' + token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      mode: 'cors',
    });
    if (res.status === 200) {
      updateParentPost();
    }
    setSubmitting(false);
  };
  return (
    <span className={style.commentAreaContainer}>
      <div className={style.formContainer}>
        <textarea
          ref={ref}
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
              setSubmitting(true);
              submitComment();
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
