import React, { useContext } from 'react';
import style from './editprofile.module.css';
import { ApiContext, TokenContext, UserContext } from '../../App';

function EditProfileOverview() {
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const apiURL = useContext(ApiContext);
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
          <p className={style.changeAvatarBtn}>Change profile photo</p>
        </div>
      </div>
      <div className={style.userOptionsWrapper}>
        <div className={style.realnameContainer}>
          <div className={style.labelInputWrapper}>
            <label htmlFor='first name'>First Name</label>
            <input
              type='text'
              name='first name'
              defaultValue={loggedInUser.firstName}
              placeholder='First Name'
            />
          </div>
          <div className={style.labelInputWrapper}>
            <label htmlFor='last name'>Last Name</label>
            <input
              type='text'
              name='last name'
              defaultValue={loggedInUser.lastName}
              placeholder='Last Name'
            />
          </div>
        </div>
        <div className={style.infoWrapper}>
          <p>
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name.
          </p>
        </div>
        <div className={style.usernameContainer}>
          <div className={style.labelInputWrapper}>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              name='username'
              defaultValue={loggedInUser.username}
              placeholder='Username'
            />
          </div>
        </div>
        <div className={style.infoWrapper}>
          <p>This is your display name that other users will find you by.</p>
        </div>
        <div>
          <div className={style.labelInputWrapper}>
            <label htmlFor='website'>Website</label>
            <input
              type='text'
              name='website'
              defaultValue={loggedInUser.website}
              placeholder='Personal website'
            />
          </div>
        </div>
        <div className={style.infoWrapper}>
          <p>If you have a personal or professional site, link it here.</p>
        </div>
        <div>
          <div className={style.labelInputWrapper}>
            <label htmlFor='bio'>Bio</label>
            <textarea name='bio' defaultValue={loggedInUser.bio}></textarea>
          </div>
        </div>
        <div className={style.infoWrapper}>
          <p>About you, your pet, or just anything you want to say.</p>
        </div>
      </div>
      <span className={style.submitContainer}></span>
    </div>
  );
}

export default EditProfileOverview;
