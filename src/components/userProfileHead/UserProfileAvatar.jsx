import React from 'react';
import style from './userprofile.module.css';

function UserProfileAvatar({ user }) {
  return (
    <div className={style.nameAvatarHeader}>
      <div className={style.userAvatarCutout}>
        <img className={style.userAvatar} src={user.avatar.url}></img>
      </div>
    </div>
  );
}

export default UserProfileAvatar;
