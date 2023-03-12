import React, { useContext, useEffect, useRef, useState } from 'react';
import { ApiContext, TokenContext, UserContext } from '../../App';
import style from './editprofile.module.css';

function ChangePasswordOverview() {
  // context is set first
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const ref = useRef([]);

  let oldPasswordRef;
  let newPasswordRef;
  let confirmPasswordRef;
  // state is set second
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [oldVisible, setOldVisble] = useState(false);
  const [newVisible, setNewVisble] = useState(false);
  const [confirmVisible, setConfirmVisble] = useState(false);

  // lifecycle is set last
  const pushRef = (el) => ref.current.push(el);
  useEffect(() => {
    oldPasswordRef = ref.current[0];
    newPasswordRef = ref.current[1];
    confirmPasswordRef = ref.current[2];
  });
  const handleOldPassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };
  const toggleShowPassword = (inputRef) => {
    if (inputRef.type === 'password') {
      inputRef.type = 'text';
      switch (inputRef.name) {
        case 'old password':
          setOldVisble(true);
          break;
        case 'new password':
          setNewVisble(true);
          break;
        case 'confirm password':
          setConfirmVisble(true);
          break;
        default:
          console.log('biiiig problem');
      }
    } else if (inputRef.type === 'text') {
      inputRef.type = 'password';
      switch (inputRef.name) {
        case 'old password':
          setOldVisble(false);
          break;
        case 'new password':
          setNewVisble(false);
          break;
        case 'confirm password':
          setConfirmVisble(false);
          break;
        default:
          console.log('biiiig problem');
      }
    }
  };
  const validatePassword = () => {
    if (newPassword === confirmNewPassword) {
      // validated
      sendNewPassword();
    } else {
      console.log('no match buddy');
    }
  };
  const sendNewPassword = async () => {
    console.log('sent');
    let data = new URLSearchParams();
    data.append(
      'changePassword',
      JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
    );
    const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
      mode: 'cors',
      method: 'PUT',
      headers: { Authorization: 'Bearer' + ' ' + token },
      body: data,
    });
    console.log(res);
  };
  return (
    <div>
      <div className={style.userAvatarContainer}>
        <div className={style.avatarCutout}>
          <img
            className={style.userAvatar}
            src={`${apiURL}/${loggedInUser.avatar}`}
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
            <input
              onChange={(e) => handleOldPassword(e)}
              ref={pushRef}
              type='password'
              name='old password'
              placeholder=''
            />
            <img
              src={
                oldVisible
                  ? `./assets/favicons/visibleoff.svg`
                  : `./assets/favicons/visible.svg`
              }
              alt='invisible svg'
              onClick={() => toggleShowPassword(oldPasswordRef)}
              className={`${style.visibilityIcon}`}
            />
          </div>
          <div className={style.labelInputWrapper}>
            <label htmlFor='new password'>New Password</label>
            <input
              onChange={(e) => handleNewPassword(e)}
              ref={pushRef}
              type='password'
              name='new password'
              placeholder=''
            />
            <img
              src={
                newVisible
                  ? `./assets/favicons/visibleoff.svg`
                  : `./assets/favicons/visible.svg`
              }
              onClick={() => toggleShowPassword(newPasswordRef)}
              alt='invisible svg'
              className={`${style.visibilityIcon}`}
            />
          </div>
          <div className={style.labelInputWrapper}>
            <label htmlFor='confirm password'>Confirm Password</label>
            <input
              onChange={(e) => handleConfirmPassword(e)}
              ref={pushRef}
              type='password'
              name='confirm password'
              placeholder=''
            />
            <img
              onClick={() => toggleShowPassword(confirmPasswordRef)}
              src={
                confirmVisible
                  ? `./assets/favicons/visibleoff.svg`
                  : `./assets/favicons/visible.svg`
              }
              alt='invisible svg'
              className={`${style.visibilityIcon}`}
            />
          </div>
        </div>
        <div className={style.submitContainer}>
          <button
            onClick={validatePassword}
            className={style.submitBtn}
            type='button'
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordOverview;
