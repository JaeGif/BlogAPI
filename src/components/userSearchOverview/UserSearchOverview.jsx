import React from 'react';
import style from './usersearchoverview.module.css';

function UserSearchOverview({ user }) {
  return (
    <div className={style.overviewContainer}>
      <div className={style.userAvatarCutout}>
        <img className={style.userAvatar} src={user.avatar.url}></img>
      </div>
      <div className={style.nameContainer}>
        <p className={style.username}>{user.userName}</p>
        <p>
          <em className={style.realNameEmphasis}>
            {user.firstName} {user.lastName}
          </em>
        </p>
      </div>
    </div>
  );
}

export default UserSearchOverview;
