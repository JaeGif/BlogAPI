import React, { useContext, useState, useEffect, useRef } from 'react';
import { ApiContext } from '../../../App';
import style from '../login/loginpage.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function CreateAccount() {
  const apiURL = useContext(ApiContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  function validateName(e) {
    const name = e.target;
    name.setCustomValidity('');

    if (name.checkValidity()) {
      const pattern = /^([a-zA-Z ']*)$/;
      if (pattern.test(name.value)) {
        name.setCustomValidity('');
        handleFirstName(e);
        setButtonDisabled(false);
      } else {
        name.setCustomValidity(
          "No special characters, only letters, ' and spaces. "
        );
        setButtonDisabled(true);
        name.reportValidity();
      }
    }
  }
  function validateLastName(e) {
    const name = e.target;
    name.setCustomValidity('');

    if (name.checkValidity()) {
      const pattern = /^([a-zA-Z ']*)$/;
      if (pattern.test(name.value)) {
        name.setCustomValidity('');
        handleLastName(e);
        setButtonDisabled(false);
      } else {
        name.setCustomValidity(
          "No special characters, only letters, ' and spaces. "
        );
        setButtonDisabled(true);

        name.reportValidity();
      }
    }
  }

  function validatePassword(e) {
    const password = e.target;
    password.setCustomValidity('');

    if (password.checkValidity()) {
      const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
      if (pattern.test(password.value)) {
        password.setCustomValidity('');
        handlePassword(e);
        setButtonDisabled(false);
      } else {
        password.setCustomValidity(
          'Minimum six characters, at least one uppercase letter, one lowercase letter, and one number.'
        );
        setButtonDisabled(true);
        password.reportValidity();
      }
    }
  }
  function matchPasswords(e) {
    const firstPassword = password;
    const confirmPassword = e.target;
    confirmPassword.setCustomValidity('');
    if (firstPassword === confirmPassword.value) {
      confirmPassword.setCustomValidity('');
      handleConfirmPassword(e);
      setButtonDisabled(false);
    } else {
      confirmPassword.setCustomValidity('Passwords do not match.');
      setButtonDisabled(true);

      confirmPassword.reportValidity();
    }
  }

  const registerUser = async () => {
    let data = new FormData();
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('username', username);
    data.append('password', password);
    let jsonData = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    };
    const res = await fetch(`${apiURL}/register`, {
      mode: 'cors',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    });
    if (res.status === 200) {
      console.log('ok');
      navigate('/login');
    }
  };

  const checkUnique = async (e) => {
    const username = e.target;
    username.setCustomValidity('');

    if (username.checkValidity()) {
      const res = await fetch(`${apiURL}/api/users/usernames`, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ username: e.target.value }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.status === 200) {
        username.setCustomValidity('');
        handleUsername(e);
      } else if (res.status === 409) {
        username.setCustomValidity('This username is already taken.');
        username.reportValidity();
      } else {
        console.log(res);
      }
    }
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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    registerUser();
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
                onChange={(e) => {
                  validateName(e);
                }}
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
                onChange={(e) => validateLastName(e)}
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
                onChange={(e) => {
                  checkUnique(e);
                }}
                className={style.textInput}
                name='username'
                type='text'
                placeholder='Username'
                aria-label='username'
                required
              />
              <input
                onChange={(e) => validatePassword(e)}
                className={style.textInput}
                name='password'
                type='password'
                placeholder='Password'
                aria-label='password'
                required
              />
              <input
                onChange={(e) => matchPasswords(e)}
                className={style.textInput}
                name='confirmpassword'
                type='password'
                placeholder='Confirm password'
                aria-label='confirm-password'
                required
              />
              <button
                type='submit'
                disabled={buttonDisabled}
                onClick={(e) => handleOnSubmit(e)}
                className={style.submitButton}
              >
                Sign Up
              </button>
            </div>
          </form>
          <div>
            <p>Already have an account?</p>
            <Link to={'/login'} replace>
              <p className={style.userHasAccountBtn}>Log in</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
