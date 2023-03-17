import React, { useContext, useEffect, useState } from 'react';
import {
  ApiContext,
  PathContext,
  TokenContext,
  UserContext,
  ProgressContext,
} from '../../../App';
import uniqid from 'uniqid';
import Notification from './Notification';
import style from './notificationslayout.module.css';
import { useQuery, useQueries } from '@tanstack/react-query';
import LoadingIcon from '../../utlity_Components/LoadingIcon';

function NotificationsLayout({ handleOpen }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);
  const basePath = useContext(PathContext);
  const width = window.innerWidth;
  const [mediaMobile, setMediaMobile] = useState(false);

  useEffect(() => {
    if (width <= 750) {
      setMediaMobile(true);
    } else {
      setMediaMobile(false);
    }
  }, []);

  const fetchNotifications = async () => {
    const res = await fetch(
      `${apiURL}/api/users/${loggedInUser._id}/notifications`,
      {
        mode: 'cors',
        headers: { Authorization: 'Bearer' + ' ' + token },
        method: 'GET',
      }
    );

    const data = await res.json();

    return data.notifications;
  };
  const notificationsQuery = useQuery({
    queryKey: ['notifications', { user: loggedInUser._id }],
    queryFn: fetchNotifications,
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'scroll');
  });
  return (
    <>
      {mediaMobile && (
        <div
          className={`${style.mobileHeaderContainer} ${style.notificationsConvert}`}
        >
          <img
            className={style.returnIcon}
            onClick={() => handleOpen('home')}
            src={`${basePath}/assets/favicons/previous.svg`}
            alt='return to home'
          />
          <h1>Notifications</h1>
        </div>
      )}
      <div className={style.notificationsWrapper}>
        <div className={`${style.notifsHeader}`}>
          {!mediaMobile && (
            <>
              <h1>Notifications</h1>
              <p>This Month</p>
            </>
          )}
        </div>
        {notificationsQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <div
              className={
                mediaMobile
                  ? `${style.notificationsMinorWrapper} ${style.mobile}`
                  : style.notificationsMinorWrapper
              }
            >
              {notificationsQuery.data.length ? (
                notificationsQuery.data.map((notification) => (
                  <Notification
                    key={uniqid()}
                    notification={notification}
                    handleOpen={handleOpen}
                  />
                ))
              ) : (
                <p>No new notifications.</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default NotificationsLayout;
