import React, { useContext } from 'react';
import { ApiContext, TokenContext, UserContext } from '../../App';
import style from './editprofile.module.css';

function ChangePasswordOverview() {
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  return (
    <div>
      <div className={style.userAvatarContainer}>
        <div className={style.avatarCutout}>
          <img
            className={style.userAvatar}
            src={`${apiURL}/${loggedInUser.avatar.url}`}
          />
        </div>
        <div className={style.userAvatarOptionsContainer}>
          <p className={style.username}>{loggedInUser.username}</p>
        </div>
      </div>
      <div className={style.userOptionsWrapper}>
        <div className={style.realnameContainer}>
          <div className={style.labelInputWrapper}>
            <label htmlFor='old password'>Old Password</label>
            <input type='password' name='old password' placeholder='' />
          </div>
          <div className={style.labelInputWrapper}>
            <label htmlFor='new password'>New Password</label>
            <input type='password' name='new password' placeholder='' />
          </div>
          <div className={style.labelInputWrapper}>
            <label htmlFor='confirm password'>Confirm Password</label>
            <input type='password' name='confirm password' placeholder='' />
          </div>
        </div>
        <div className={style.submitContainer}>
          <button className={style.submitBtn} type='button'>
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordOverview;
