import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from '../../App';
import style from './userprofile.module.css';

function UserProfileLocationHeader({ user, location }) {
  const [isLocation, setIsLocation] = useState(true);
  const apiURL = useContext(ApiContext);
  useEffect(() => {
    if (location === '') {
      setIsLocation(false);
    }
  });

  return (
    <div className={style.nameAvatarHeader}>
      <div className={style.userAvatarCutout}>
        <img
          className={style.userAvatar}
          src={`${apiURL}/${user.avatar.url}`}
        ></img>
      </div>
      <div className={style.nameLocationHeader}>
        <p>
          <em className={style.userNameEmphasis}>{user.userName}</em>
        </p>
        {isLocation ? (
          <p>
            <em className={style.locationStrip}>{location}</em>
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default UserProfileLocationHeader;
