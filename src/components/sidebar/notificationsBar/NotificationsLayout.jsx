import React, { useContext, useEffect, useState } from 'react';
import { ApiContext, PathContext, UserContext } from '../../../App';
import uniqid from 'uniqid';
import Notification from './Notification';
import style from './notificationslayout.module.css';

function NotificationsLayout() {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);

  const [recentNotifications, setRecentNotifications] = useState([]);
  // notifications get username, action, date, userID
  const handleNotificationClick = (notification) => {
    switch (notification.type) {
      case 'post/like':
        // open the specific full post.
        break;
      case 'user/follow':
        // open the new followers homepage
        break;
      case 'user/tagged':
      // open the specific full post
      default:
        return alert(
          'RED ALERT!!! UNKNOWN NOTIFICATION, PROBABLY FORGOT TO LOAD DB WITH APPROPRIATE DATA, TRY AGAIN USING A LOADING SCRIPT AND DOUBLE CHECK THE USER FIELDS.'
        );
        break;
    }
  };
  useEffect(() => {
    async function findUserNotifications() {
      console.log('finding notifs');
      const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`);
      const data = await res.json();
      setRecentNotifications(data.user.notifications);
    }
    findUserNotifications();
  }, []);

  return (
    <div className={style.notificationsWrapper}>
      <div className={style.notifsHeader}>
        <h1>Notifications</h1>
        <p>This Month</p>
      </div>
      <div className={style.notificationsMinorWrapper}>
        {recentNotifications.length ? (
          recentNotifications.map((notification) => (
            <Notification key={uniqid()} notification={notification} />
          ))
        ) : (
          <p>No new notifications.</p>
        )}
      </div>
    </div>
  );
}

export default NotificationsLayout;
