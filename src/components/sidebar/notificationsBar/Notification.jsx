import React, { useEffect, useState, useContext } from 'react';
import style from './notification.module.css';

function Notification({ notification }) {
  const [message, setMessage] = useState('');
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
    <div className={style.notificationWrapper}>
      <div className={style.avatarContainer}>
        <img
          className={style.userAvatar}
          src={notification.user.avatar.url}
          alt='profile image'
        />
      </div>
      <p>
        <em className={style.userName}>{notification.user.userName}</em>{' '}
        {message}
      </p>
    </div>
  );
}

export default Notification;
