import React, { useContext, useEffect, useState } from 'react';
import {
  ApiContext,
  PathContext,
  TokenContext,
  UserContext,
} from '../../../App';
import uniqid from 'uniqid';
import Notification from './Notification';
import style from './notificationslayout.module.css';
import { useQuery, useQueries } from '@tanstack/react-query';

function NotificationsLayout({ handleOpen }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);

  const [recentNotifications, setRecentNotifications] = useState(
    loggedInUser.notifications
  );
  // notifications get username, action, date, userID

  /*   useEffect(() => {
    async function findUserNotifications() {
      console.log('finding notifs');
      let data = new URLSearchParams();
      data.append('seen', true);
      // send seen notifications to db
      const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
        mode: 'cors',
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Bearer' + ' ' + token,
        },
      });
      const notifications = await res.json();
      console.log(notifications.notifications);
      setRecentNotifications(notifications.notifications);
    }
    findUserNotifications();
    console.log('checked notifs');
  }, []); */

  const fetchNotifications = async (notifId) => {
    console.log(notifId);
    const res = await fetch(
      `${apiURL}/api/users/${loggedInUser._id}/notifications/${notifId}`,
      {
        mode: 'cors',
        headers: { Authorization: 'Bearer' + ' ' + token },
        method: 'GET',
      }
    );
    console.log('fetching');
    const data = res.json();
    console.log(data);
    return data.notification;
  };

  return (
    <div className={style.notificationsWrapper}>
      <div className={style.notifsHeader}>
        <h1>Notifications</h1>
        <p>This Month</p>
      </div>
      <div className={style.notificationsMinorWrapper}>
        {recentNotifications.length ? (
          recentNotifications.map((notification) => (
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
    </div>
  );
}

export default NotificationsLayout;
