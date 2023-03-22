import React, { useState, useContext, useEffect } from 'react';
import Suggested from '../suggested/Suggested';
import ChangePasswordOverview from './ChangePasswordOverview';
import style from './editprofile.module.css';
import EditProfileOverview from './EditProfileOverview';
import LoginActivityOverview from './LoginActivityOverview';

function EditProfile({ refreshLoggedInUserData, handleLogOut }) {
  const [isEditProfile, setIsEditProfile] = useState(true);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [mediaMobile, setMediaMobile] = useState(false);
  const width = window.innerWidth;

  useEffect(() => {
    if (width <= 750) {
      setMediaMobile(true);
    }
  });
  const handleOptionSwitch = (option) => {
    switch (option) {
      case 'edit':
        setIsEditProfile(true);
        setIsChangePassword(false);
        break;
      case 'password':
        setIsEditProfile(false);
        setIsChangePassword(true);
        break;

      default:
        // default case matches edit profile
        setIsEditProfile(true);
        setIsChangePassword(false);
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
          <div className={style.logOut} onClick={() => handleLogOut()}>
            <span className={style.spanOptions}>Log out</span>
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
        </div>
      </div>
      {!mediaMobile && <Suggested />}
    </>
  );
}

export default EditProfile;
