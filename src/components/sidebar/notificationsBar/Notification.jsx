import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState, useContext } from 'react';
import {
  ProfileContext,
  PostContext,
  ApiContext,
  TokenContext,
  UserContext,
} from '../../../App';
import style from './notification.module.css';

function Notification({ notification, handleOpen }) {
  const token = useContext(TokenContext);
  const [message, setMessage] = useState('');
  const apiURL = useContext(ApiContext);
  const getUserProfile = useContext(ProfileContext);
  const getPostFull = useContext(PostContext);
  const loggedInUser = useContext(UserContext);
  // alternate notification types to change the layout slightly
  const [isLike, setIsLike] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isTag, setIsTag] = useState(false);
  const [notificationRetrieved, setNotificationRetrieved] = useState(false);
  const [isViewed, setIsViewed] = useState(true);

  useEffect(() => {
    for (let i = 0; i < loggedInUser.notifications.length; i++) {
      if (loggedInUser.notifications[i]._id === notification._id) {
        setIsViewed(loggedInUser.notifications[i].seen);
        break;
      }
    }
  }, []);
  console.log(notification);
  const fetchUserData = async () => {
    if (notification.type === 'user/tagged') {
      const res = await fetch(`${apiURL}/api/users/${notification.post.user}`, {
        mode: 'cors',
        headers: { Authorization: 'Bearer' + ' ' + token },
        method: 'GET',
      });
      const data = await res.json();
      return data.user;
    } else {
      const res = await fetch(`${apiURL}/api/users/${notification.user}`, {
        mode: 'cors',
        headers: { Authorization: 'Bearer' + ' ' + token },
        method: 'GET',
      });
      const data = await res.json();
      return data.user;
    }
  };

  const notificationUserDataQuery = useQuery({
    queryKey: ['users', { notification: notification._id }],
    queryFn: fetchUserData,
  });
  useEffect(() => {
    // runs 2x to check for the data returned from both notifications
    // and user data and assign messages.
    if (notificationUserDataQuery.data) {
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
    }
  }, [notificationUserDataQuery.data]);

  return notificationUserDataQuery.data ? (
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
          src={
            notificationRetrieved
              ? `${apiURL}/${notificationUserDataQuery.data.avatar}`
              : ''
          }
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
          {notificationRetrieved ? notificationUserDataQuery.data.username : ''}
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
