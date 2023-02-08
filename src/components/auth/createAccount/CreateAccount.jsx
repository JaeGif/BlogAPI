import React, { useContext, useState, useEffect } from 'react';
import { ApiContext } from '../../../App';
import style from '../login/loginpage.module.css';

function CreateAccount({ handleHasAccount }) {
  const apiURL = useContext(ApiContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = async () => {
    let data = new URLSearchParams();
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('username', username);
    data.append('password', password);

    const res = await fetch(`${apiURL}/register`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
    });
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const validateInputs = () => {
    let err = {
      firstName: null,
      lastName: null,
      username: null,
      password: null,
      passwordMatch: null,
    };
    if (typeof firstName !== 'string') {
      err.firstName = false;
    } else {
      err.firstName = true;
    }
    if (typeof lastName !== 'string') {
      err.lastName = false;
    } else {
      err.lastName = true;
    }
    if (typeof username !== 'string') {
      err.username = false;
    } else {
      err.username = true;
    }
    if (typeof password !== 'string') {
      err.password = false;
    } else {
      err.password = true;
    }
    if (password !== confirmPassword) {
      err.passwordMatch = false;
    } else {
      err.passwordMatch = true;
    }
    if (
      err.firstName === true &&
      err.lastName === true &&
      err.username === true &&
      err.password === true &&
      err.passwordMatch === true
    ) {
      return null;
    } else return err;
  };

  const handleOnSubmit = () => {
    const err = validateInputs();
    if (err) {
      return console.log(err);
    } else {
      registerUser();
      handleHasAccount();
    }
  };

  return (
    <div className={style.modalWrapper}>
      <div className={style.logInContainer}>
        <div className={style.signUpModal}>
          <h1 className={style.brandFont}>Not Instagram</h1>
          <h1>Create an Account</h1>
          <form>
            <div className={style.formAlignment}>
              <input
                onChange={(e) => handleFirstName(e)}
                className={style.textInput}
                name='firstname'
                type='text'
                placeholder='First name'
                aria-label='first name'
                autoCapitalize='on'
                autoComplete='given-name'
                required
              />
              <input
                onChange={(e) => handleLastName(e)}
                className={style.textInput}
                name='lastname'
                type='text'
                placeholder='Last name'
                aria-label='last name'
                autoCapitalize='on'
                autoComplete='family-name'
                required
              />
              <input
                onChange={(e) => handleUsername(e)}
                className={style.textInput}
                name='username'
                type='text'
                placeholder='Username'
                aria-label='username'
                required
              />
              <input
                onChange={(e) => handlePassword(e)}
                className={style.textInput}
                name='password'
                type='password'
                placeholder='Password'
                aria-label='password'
                required
              />
              <input
                onChange={(e) => handleConfirmPassword(e)}
                className={style.textInput}
                name='confirmpassword'
                type='password'
                placeholder='Confirm password'
                aria-label='confirm-password'
                required
              />
              <button onClick={handleOnSubmit} className={style.submitButton}>
                Sign Up
              </button>
            </div>
          </form>
          <div>
            <p>Already have an account?</p>
            <p
              onClick={(e) => {
                e.stopPropagation();
                handleHasAccount();
              }}
              className={style.userHasAccountBtn}
            >
              Log in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
