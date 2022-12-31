import React, { useState } from 'react';
import style from './AddCommentInput.module.css';

function AddCommentInput({ post }) {
  const dummyUser = {
    avatar: {
      id: '96aeffbdfeafb48bbfbc8cea',
      url: 'https://instaapi-production.up.railway.app/uploads/fe0db393eeaeaa8530a38e1d/avatar.jpg',
    },
    _id: 'fe0db393eeaeaa8530a38e1d',
    firstName: 'Osborne',
    lastName: 'Crooks',
    email: 'Lavonne_Bradtke@yahoo.com',
    userName: 'Rhea67',
    password: 'XECx6ylxRz4ylw5',
    isAdmin: false,
    __v: 0,
  };

  const [isValue, setIsValue] = useState(false);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState({
    id: dummyUser._id,
    userName: dummyUser.userName,
    avatar: {
      id: dummyUser.avatar.id,
      url: dummyUser.avatar.url,
    },
  });

  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;

  const commentRoute = `${localURL}/api/posts/${post}`;

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
      mode: 'no-cors',
    }).then(resetData());
  };

  return (
    <span className={style.commentAreaContainer}>
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
      <p
        onClick={submitComment}
        className={
          isValue ? `${style.postBtn} ${style.activePost}` : style.postBtn
        }
      >
        Post
      </p>
    </span>
  );
}

export default AddCommentInput;
