import React, { useContext } from 'react';
import { ApiContext } from '../../App';
import style from './userprofile.module.css';

function UserProfileAvatar({ user }) {
  const apiURL = useContext(ApiContext);

  /*   const fetchUser = async () => {
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
  }); */

  return (
    <div className={style.nameAvatarHeader}>
      <div className={style.userAvatarCutout}>
        <img
          className={style.userAvatar}
          src={`${apiURL}/${user.avatar}`}
        ></img>
      </div>
    </div>
  );
}

export default UserProfileAvatar;
