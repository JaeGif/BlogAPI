import React, { useEffect, useState, useContext } from 'react';

function Notification({ notification }) {
  console.log(notification.type);
  const [message, setMessage] = useState('');
  useEffect(() => {
    switch (notification.type) {
      case 'post/like':
        setMessage('liked your post.');
        console.log('like');
        break;
      case 'user/follow':
        setMessage('started following you.');
        console.log('follow');
        break;

      case 'user/tagged':
        setMessage('tagged you in a post.');
        console.log('tag');
        break;

      default:
        console.log('SOMETHING IS PRETTY WRONG');
        break;
    }
  }, []);

  return (
    <div>
      {/*       <img src={notification.user.avatar.url} alt='profile image' />
       */}{' '}
      <p>
        <em>{notification.user.userName}</em>
        {message}
      </p>
    </div>
  );
}

export default Notification;
