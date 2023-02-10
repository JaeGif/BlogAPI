import React, { useEffect, useState, useContext } from 'react';
import {
  ProfileContext,
  PostContext,
  ApiContext,
  TokenContext,
} from '../../../App';
import style from './notification.module.css';

function Notification({ notification, handleOpen }) {
  const token = useContext(TokenContext);
  const [message, setMessage] = useState('');
  const apiURL = useContext(ApiContext);
  const getUserProfile = useContext(ProfileContext);
  const getPostFull = useContext(PostContext);
  // alternate notification types to change the layout slightly
  const [isLike, setIsLike] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isTag, setIsTag] = useState(false);
  const [notificationRetrieved, setNotificationRetrieved] = useState(false);
  const [isViewed, setIsViewed] = useState(notification.seen);
  const [userData, setUserData] = useState();

  console.log(notification);
  console.log(isViewed);

  const fetchUserData = async () => {
    let res;
    isTag
      ? (res = await fetch(`${apiURL}/api/users/${notification.post.user}`, {
          mode: 'cors',
          headers: { Authorization: 'Bearer' + ' ' + token },
        }))
      : (res = await fetch(`${apiURL}/api/users/${notification.user}`, {
          mode: 'cors',
          headers: { Authorization: 'Bearer' + ' ' + token },
        }));

    const data = await res.json();
    console.log(data);
    setUserData(data.user);
  };

  useEffect(() => {
    switch (notification.type) {
      case 'post/like':
        setMessage('liked your post.');
        setIsLike(true);
        setNotificationRetrieved(true);
        break;
      case 'user/follow':
        setMessage('started following you.');
        setIsFollow(true);
        setNotificationRetrieved(true);
        break;
      case 'user/tagged':
        setMessage('tagged you in a post.');
        setIsTag(true);
        setNotificationRetrieved(true);
        break;
      default:
        console.log('SOMETHING IS PRETTY WRONG');
        break;
    }
    fetchUserData();
  }, []);

  return userData ? (
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
          : isTag
          ? (e) => {
              e.stopPropagation();
              handleOpen('');
              getPostFull(notification.post._id);
            }
          : isFollow
          ? (e) => {
              e.stopPropagation();
              handleOpen('');
              getUserProfile(notification.user._id);
            }
          : undefined
      }
    >
      <div className={style.avatarContainer}>
        <img
          className={style.userAvatar}
          src={notificationRetrieved ? `${apiURL}/${userData.avatar}` : ''}
          alt='profile image'
        />
      </div>

      <p className={style.messageP}>
        <em
          onClick={
            isTag
              ? (e) => {
                  e.stopPropagation();
                  handleOpen('');
                  getUserProfile(notification.post.user);
                }
              : (e) => {
                  e.stopPropagation();
                  handleOpen('');
                  getUserProfile(notification.user);
                }
          }
          className={style.userName}
        >
          {notificationRetrieved ? userData.username : ''}
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
      ) : isTag ? (
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
  ) : (
    <></>
  );
}

export default Notification;
