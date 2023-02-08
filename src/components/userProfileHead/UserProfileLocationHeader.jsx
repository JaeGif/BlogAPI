import React, { useState, useEffect, useContext } from 'react';
import { ApiContext, TokenContext } from '../../App';
import style from './userprofile.module.css';
import { useQuery } from '@tanstack/react-query';

function UserProfileLocationHeader({ userData, location }) {
  const [isLocation, setIsLocation] = useState(true);
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);
  useEffect(() => {
    if (location === '') {
      setIsLocation(false);
    }
  }, []);

  return (
    <div className={style.nameAvatarHeader}>
      <div className={style.userAvatarCutout}>
        <img
          className={style.userAvatar}
          src={`${apiURL}/${userData.avatar}`}
        ></img>
      </div>
      <div className={style.nameLocationHeader}>
        <p>
          <em className={style.userNameEmphasis}>{userData.username}</em>
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
