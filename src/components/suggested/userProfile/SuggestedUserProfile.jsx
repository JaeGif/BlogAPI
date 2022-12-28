import React from 'react';
import style from '../suggested.module.css';

function SuggestedUserProfile({ user }) {
  return (
    <div>
      <div className={style.profileContainer}>
        <img /* src={user.avatar.url} */ alt='profile image'></img>

        <div>
          <p>{user.userName}</p>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
      </div>
      <p className={style.switchUserBtn}>Follow</p>
    </div>
  );
}

export default SuggestedUserProfile;
