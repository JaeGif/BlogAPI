import React, { useState } from 'react';
import style from './userprofile.module.css';

function UserProfile({ user }) {
  return (
    <div className={style.nameAvatarHeader}>
      <div className={style.userAvatarCutout}>
        <img className={style.userAvatar} src={user.avatar.url}></img>
      </div>
      <p>
        <em className={style.userNameEmphasis}>{user.userName}</em>
      </p>
    </div>
  );
}

export default UserProfile;
