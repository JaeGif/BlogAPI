import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import style from './loginpage.module.css';

function LoginPage({ handleLogIn, isValid }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const passwordRef = useRef(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function validateLogin(e) {
    const passwordField = passwordRef.current;
    passwordField.setCustomValidity('');

    if (passwordField.checkValidity()) {
      const success = await handleLogIn(username, password);
      console.log(success);
      if (success) {
        passwordField.setCustomValidity('');
      } else {
        passwordField.setCustomValidity('Incorrect username or password');
        passwordField.reportValidity();
      }
    }
  }

  return (
    <div className={style.modalWrapper}>
      <div className={style.logInContainer}>
        <div className={style.signInModal}>
          <h1 className={style.brandFont}>Not Instagram</h1>
          <h2>Already have an account?</h2>
          <form>
            <div className={style.formAlignment}>
              <input
                onChange={(e) => handleUsernameChange(e)}
                className={style.textInput}
                name='username'
                placeholder='Username'
                aria-label='username'
                type='text'
                required
              />
              <input
                onChange={(e) => handlePasswordChange(e)}
                className={style.textInput}
                name='password'
                type='password'
                ref={passwordRef}
                aria-label='password'
                placeholder='Password'
                required
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  validateLogin(e);
                }}
                className={style.submitButton}
              >
                Log In
              </button>
            </div>
          </form>
          <div className={style.orContainer}>
            <hr className={style.orContainerRule} />
            <h4> OR </h4>
            <hr className={style.orContainerRule} />
          </div>

          <div className={style.additionalLoginOptions}>
            <div className={style.createAcctRedirectContainer}>
              <div className={style.createAcctRedirect}>
                <Link to={'/register'}>
                  <button className={style.createAcctBtn}>
                    Create Account
                  </button>
                </Link>
              </div>
            </div>
            <div className={style.createAcctRedirectContainer}>
              <a className={style.createAcctRedirect}>
                <button className={style.guestLogin}>Guest Login</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
