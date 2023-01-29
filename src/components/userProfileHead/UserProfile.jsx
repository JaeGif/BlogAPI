import React, { useState } from 'react';
import { ApiContext } from '../../App';
import style from './userprofile.module.css';

function UserProfile({ user }) {
  const apiURL = useContext(ApiContext);
  return (
    <div className={style.nameAvatarHeader}>
      <div className={style.userAvatarCutout}>
        <img
          className={style.userAvatar}
          src={`${apiURL}/${user.avatar.url}`}
        ></img>
      </div>
      <p>
        <em className={style.userNameEmphasis}>{user.userName}</em>
      </p>
    </div>
  );
}

export default UserProfile;
