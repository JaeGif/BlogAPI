import React, { useContext } from 'react';
import { ApiContext } from '../../App';
import style from './userprofile.module.css';

function UserProfileAvatar({ user }) {
  const apiURL = useContext(ApiContext);
  return (
    <div className={style.nameAvatarHeader}>
      <div className={style.userAvatarCutout}>
        <img
          className={style.userAvatar}
          src={`${apiURL}/${user.avatar.url}`}
        ></img>
      </div>
    </div>
  );
}

export default UserProfileAvatar;
