import React, { useState, useContext, useEffect } from 'react';
import ChangePasswordOverview from './ChangePasswordOverview';
import style from './editprofile.module.css';
import EditProfileOverview from './EditProfileOverview';
import LoginActivityOverview from './LoginActivityOverview';

function EditProfile() {
  const [isEditProfile, setIsEditProfile] = useState(true);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isLoginActivity, setIsLoginActivity] = useState(false);

  return (
    <div className={style.editWrapper}>
      <div className={style.optionsBarContainer}>
        <span>
          <p>Edit Profile</p>
        </span>
        <span>
          <p>Change Password</p>
        </span>
        <span>
          <p>Login Activity</p>
        </span>
      </div>
      <div className={style.displayOptionWrapper}>
        {isEditProfile ? <EditProfileOverview /> : <></>}
        {isChangePassword ? <ChangePasswordOverview /> : <></>}
        {isLoginActivity ? <LoginActivityOverview /> : <></>}
      </div>
    </div>
  );
}

export default EditProfile;
