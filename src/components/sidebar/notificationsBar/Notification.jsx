import React, { useEffect, useState, useContext } from 'react';
import { ProfileContext, PostContext, ApiContext } from '../../../App';
import style from './notification.module.css';

function Notification({ notification, handleOpen }) {
  const [message, setMessage] = useState('');
  const apiURL = useContext(ApiContext);
  const getUserProfile = useContext(ProfileContext);
  const getPostFull = useContext(PostContext);
  // alternate notification types to change the layout slightly
  const [isLike, setIsLike] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isTag, setIsTag] = useState(false);
  const [isViewed, setIsViewed] = useState(notification.seen);

  useEffect(() => {
    console.log(notification);
    switch (notification.type) {
      case 'post/like':
        setMessage('liked your post.');
        setIsLike(true);
        break;
      case 'user/follow':
        setMessage('started following you.');
        setIsFollow(true);
        break;
      case 'user/tagged':
        setMessage('tagged you in a post.');
        setIsTag(true);
        break;
      default:
        console.log('SOMETHING IS PRETTY WRONG');
        break;
    }
  }, []);

  return (
    <div
      className={
        isViewed
          ? `${style.notificationWrapper}`
          : `${style.notificationWrapper} ${style.unViewed}`
      }
      onClick={
        isLike
          ? (e) => {
              e.stopPropagation();
              handleOpen('');
              getPostFull(notification.post._id);
            }
          : undefined
      }
    >
      <div className={style.avatarContainer}>
        <img
          className={style.userAvatar}
          src={notification.user.avatar.url}
          alt='profile image'
        />
      </div>

      <p className={style.messageP}>
        <em
          onClick={(e) => {
            e.stopPropagation();
            handleOpen('');
            getUserProfile(notification.user._id);
          }}
          className={style.userName}
        >
          {notification.user.userName}
        </em>{' '}
        {message}
      </p>
      {isLike ? (
        <div className={style.thumbnailContainer}>
          <img
            className={style.postThumbnail}
            src={`${apiURL}/${notification.post.thumbnail.url}`}
            alt={notification.post.thumbnail.alt}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Notification;
