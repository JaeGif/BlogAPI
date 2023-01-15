import React, { useEffect, useState, useContext } from 'react';
import { ProfileContext, PostContext } from '../../../App';
import style from './notification.module.css';

function Notification({ notification }) {
  const [message, setMessage] = useState('');
  const getUserProfile = useContext(ProfileContext);
  const getPostFull = useContext(PostContext);
  useEffect(() => {
    switch (notification.type) {
      case 'post/like':
        setMessage('liked your post.');
        break;
      case 'user/follow':
        setMessage('started following you.');
        break;
      case 'user/tagged':
        setMessage('tagged you in a post.');
        break;
      default:
        console.log('SOMETHING IS PRETTY WRONG');
        break;
    }
  }, []);

  return (
    <div
      className={style.notificationWrapper}
      onClick={(e) => {
        e.stopPropagation();
        getPostFull(notification.post._id);
      }}
    >
      <div className={style.avatarContainer}>
        <img
          className={style.userAvatar}
          src={notification.user.avatar.url}
          alt='profile image'
        />
      </div>
      <p>
        <em
          onClick={(e) => {
            e.stopPropagation();
            getUserProfile(notification.user._id);
          }}
          className={style.userName}
        >
          {notification.user.userName}
        </em>{' '}
        {message}
      </p>
    </div>
  );
}

export default Notification;
