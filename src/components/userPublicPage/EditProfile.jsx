import React, { useState, useContext, useEffect } from 'react';
import Suggested from '../suggested/Suggested';
import ChangePasswordOverview from './ChangePasswordOverview';
import style from './editprofile.module.css';
import EditProfileOverview from './EditProfileOverview';
import LoginActivityOverview from './LoginActivityOverview';

function EditProfile({ refreshLoggedInUserData, handleLogOut }) {
  const [isEditProfile, setIsEditProfile] = useState(true);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isLoginActivity, setIsLoginActivity] = useState(false);

  const handleOptionSwitch = (option) => {
    switch (option) {
      case 'edit':
        setIsEditProfile(true);
        setIsChangePassword(false);
        setIsLoginActivity(false);
        break;
      case 'password':
        setIsEditProfile(false);
        setIsChangePassword(true);
        setIsLoginActivity(false);
        break;
      case 'activity':
        setIsEditProfile(false);
        setIsChangePassword(false);
        setIsLoginActivity(true);
        break;
      default:
        // default case matches edit profile
        setIsEditProfile(true);
        setIsChangePassword(false);
        setIsLoginActivity(false);
        break;
    }
  };

  return (
    <>
      <div className={style.editWrapper}>
        <div className={style.optionsBarContainer}>
          <div
            className={isEditProfile ? `${style.selected}` : ''}
            onClick={() => handleOptionSwitch('edit')}
          >
            <span className={style.spanOptions}>Edit Profile</span>
          </div>
          <div
            className={isChangePassword ? `${style.selected}` : ''}
            onClick={() => handleOptionSwitch('password')}
          >
            <span className={style.spanOptions}>Change Password</span>
          </div>
          <div
            className={isLoginActivity ? `${style.selected}` : ''}
            onClick={() => handleOptionSwitch('activity')}
          >
            <span className={style.spanOptions}>Login Activity</span>
          </div>
        </div>
        <div className={style.displayOptionWrapper}>
          {isEditProfile ? (
            <EditProfileOverview
              handleLogOut={handleLogOut}
              refreshLoggedInUserData={refreshLoggedInUserData}
            />
          ) : (
            <></>
          )}
          {isChangePassword ? <ChangePasswordOverview /> : <></>}
          {isLoginActivity ? <LoginActivityOverview /> : <></>}
        </div>
      </div>
      <Suggested />
    </>
  );
}

export default EditProfile;
