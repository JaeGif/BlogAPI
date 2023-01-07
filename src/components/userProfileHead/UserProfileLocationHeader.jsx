import React, { useState } from 'react';
import style from './userprofile.module.css';

function UserProfileLocationHeader({ user, location }) {
  return (
    <div className={style.nameAvatarHeader}>
      <div className={style.userAvatarCutout}>
        <img className={style.userAvatar} src={user.avatar.url}></img>
      </div>
      <div className={style.nameLocationHeader}>
        <p>
          <em className={style.userNameEmphasis}>{user.userName}</em>
        </p>
        <p>
          <em className={style.locationStrip}>{location}</em>
        </p>
      </div>
    </div>
  );
}

export default UserProfileLocationHeader;
