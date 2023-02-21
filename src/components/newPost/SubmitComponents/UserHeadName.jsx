import React from 'react';
import style from '../newpost.module.css';
import UserProfileAvatar from '../../userProfileHead/UserProfileAvatar';

function UserHeadName({ user }) {
  return (
    <span className={style.userHeadSubmit}>
      <UserProfileAvatar user={user} />
      <p className={`${style.textSizing} ${style.userName}`}>{user.username}</p>
    </span>
  );
}

export default UserHeadName;
