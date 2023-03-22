import React from 'react';
import { useEffect, useState } from 'react';
import style from './status.module.css';

function Status({ setHTTPCode, HTTPCode }) {
  const [fadeOut, setFadeOut] = useState(false);
  const changeMessage = () => {
    if (HTTPCode === 200) {
      return 'Request handled successfully.';
    } else if (HTTPCode >= 400) {
      return `Something has gone wrong ... \n HTTP Status: ${HTTPCode}`;
    } else {
      return `We're not sure what just happened ... HTTP Status: ${HTTPCode}`;
    }
  };
  const messageTimeout = () => {
    setFadeOut(true);
    setTimeout(() => setHTTPCode(0), 4000);
  };
  useEffect(() => {
    messageTimeout();
  }, []);

  return (
    <div
      className={
        fadeOut
          ? HTTPCode === 200
            ? `${style.floating} ${style.remove} ${style.success}`
            : `${style.floating} ${style.remove} ${style.failure}`
          : `${style.floating}`
      }
    >
      {changeMessage()}
    </div>
  );
}

export default Status;
