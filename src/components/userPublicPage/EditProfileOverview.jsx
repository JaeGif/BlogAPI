import React, { useContext, useState, useRef } from 'react';
import style from './editprofile.module.css';
import { ApiContext, TokenContext, UserContext } from '../../App';

function EditProfileOverview({ refreshLoggedInUserData }) {
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const apiURL = useContext(ApiContext);
  const getFile = useRef(null);
  const fileUpload = (ref) => {
    ref.current.click();
  };

  const [firstName, setFirstName] = useState(undefined);
  const [lastName, setLastName] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [website, setWebsite] = useState(undefined);
  const [bio, setBio] = useState(undefined);

  const handlePOSTEdits = async () => {
    console.log('click');
    let data = new URLSearchParams();
    let dataObj = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      website: website,
      bio: bio,
    };
    data.append('editUser', JSON.stringify(dataObj));
    console.log(data);
    const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
      mode: 'cors',
      method: 'PUT',
      headers: { Authorization: 'Bearer' + ' ' + token },
      body: data,
    });
    refreshLoggedInUserData();
    const status = res;
    console.log(status);
  };

  const handleProfilePhotoChange = async (file) => {
    console.log(file);
    let data = new FormData();
    data.append('image', file[0]);
    const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
      mode: 'cors',
      method: 'PUT',
      headers: { Authorization: 'Bearer' + ' ' + token },
      body: data,
    });
    refreshLoggedInUserData();
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value);
  };
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

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
          <p
            onClick={() => fileUpload(getFile)}
            className={style.changeAvatarBtn}
          >
            Change profile photo
          </p>
          <input
            type='file'
            ref={getFile}
            name='image'
            accept='image/jpg, image/jpeg, image/png'
            style={{ display: 'none' }}
            onChange={(e) => handleProfilePhotoChange(e.target.files)}
          />
        </div>
      </div>
      <div className={style.userOptionsWrapper}>
        <div className={style.realnameContainer}>
          <div className={style.labelInputWrapper}>
            <label htmlFor='first name'>First Name</label>
            <input
              onChange={(e) => handleFirstNameChange(e)}
              type='text'
              name='first name'
              defaultValue={loggedInUser.firstName}
              placeholder='First Name'
            />
          </div>
          <div className={style.labelInputWrapper}>
            <label htmlFor='last name'>Last Name</label>
            <input
              onChange={(e) => handleLastNameChange(e)}
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
              onChange={(e) => handleUsernameChange(e)}
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
              onChange={(e) => handleWebsiteChange(e)}
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
            <textarea
              onChange={(e) => handleBioChange(e)}
              name='bio'
              defaultValue={loggedInUser.bio}
            ></textarea>
          </div>
        </div>
        <div className={style.infoWrapper}>
          <p>About you, your pet, or just anything you want to say.</p>
        </div>
      </div>
      <span className={style.submitContainer}>
        <button
          onClick={handlePOSTEdits}
          type='button'
          className={style.submitBtn}
        >
          Submit
        </button>
      </span>
    </div>
  );
}

export default EditProfileOverview;
