import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { ApiContext, TokenContext } from '../../App';
import style from './userprofile.module.css';

function UserProfileAvatar({ userId }) {
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);

  const fetchUser = async () => {
    const res = await fetch(`${apiURL}/api/users/${userId}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    return data.user;
  };

  const userQuery = useQuery({
    queryKey: ['users', userId],
    queryFn: fetchUser,
  });

  return (
    userQuery.data && (
      <div className={style.nameAvatarHeader}>
        <div className={style.userAvatarCutout}>
          <img
            className={style.userAvatar}
            src={`${apiURL}/${userQuery.data.avatar}`}
          ></img>
        </div>
      </div>
    )
  );
}

export default UserProfileAvatar;
