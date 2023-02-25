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
  const [notificationData, setNotificationData] = useState();
  const [notificationUserData, setNotificationUserData] = useState();

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
    return data.user;
  };

  /*   useEffect(() => {
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
  }, []); */

  const fetchNotificationData = () => {
    const notificationRes = fetch(
      `${apiURL}/api/users/${loggedInUser._id}/notifications/${notification}`,
      {
        mode: 'cors',
        headers: { Authorization: 'Bearer' + ' ' + token },
        method: 'GET',
      }
    ).then((data) => {
      data.json().then((notification) => {
        setNotificationData(notification.notification);
        console.log(notification);
        fetch(`${apiURL}/api/users/${notification.notification.user}`, {
          mode: 'cors',
          headers: { Authorization: 'Bearer' + ' ' + token },
          method: 'GET',
        }).then((data) => {
          data.json().then((user) => {
            console.log(user);
            setNotificationUserData(user.user);
          });
        });
      });
    });
  };
  useEffect(() => {
    if (!notificationData) {
      fetchNotificationData();
    } else if (notificationData && notificationUserData) {
      switch (notificationData.type) {
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
  }, [notificationData, notificationUserData]);
  return notificationRetrieved ? (
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
              getPostFull(notificationData.post._id);
            }
          : isTag
          ? (e) => {
              e.stopPropagation();
              handleOpen('');
              getPostFull(notificationData.post._id);
            }
          : isFollow
          ? (e) => {
              e.stopPropagation();
              handleOpen('');
              getUserProfile(notificationData.user._id);
            }
          : undefined
      }
    >
      <div className={style.avatarContainer}>
        <img
          className={style.userAvatar}
          src={
            notificationRetrieved
              ? `${apiURL}/${notificationUserData.avatar}`
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
                  getUserProfile(notificationData.post.user);
                }
              : (e) => {
                  e.stopPropagation();
                  handleOpen('');
                  getUserProfile(notificationData.user);
                }
          }
          className={style.userName}
        >
          {notificationRetrieved ? notificationUserData.username : ''}
        </em>{' '}
        {message}
      </p>
      {isLike ? (
        <div className={style.thumbnailContainer}>
          <img
            className={style.postThumbnail}
            src={`${apiURL}/${notificationData.post.thumbnail.url}`}
            alt={notificationData.post.thumbnail.alt}
          />
        </div>
      ) : isTag ? (
        <div className={style.thumbnailContainer}>
          <img
            className={style.postThumbnail}
            src={`${apiURL}/${notificationData.post.thumbnail.url}`}
            alt={notificationData.post.thumbnail.alt}
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
