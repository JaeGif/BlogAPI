import React, { useContext } from 'react';
import { ApiContext } from '../../App';
import style from './usersearchoverview.module.css';

function UserSearchOverview({ userData, handleClick }) {
  const apiURL = useContext(ApiContext);

  return (
    <div
      onClick={() => handleClick(userData)}
      className={style.overviewContainer}
    >
      <div className={style.userAvatarCutout}>
        <img
          className={style.userAvatar}
          src={`${apiURL}/${userData.avatar}`}
        ></img>
      </div>
      <div className={style.nameContainer}>
        <p className={style.username}>{userData.username}</p>
        <p>
          <em className={style.realNameEmphasis}>
            {userData.firstName} {userData.lastName}
          </em>
        </p>
      </div>
    </div>
  );
}

export default UserSearchOverview;
