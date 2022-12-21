import React from 'react';
import style from './sidebar.module.css';

function Sidebar() {
  return (
    <div>
      <div className={style.optionsSidebar}>
        <div>
          <a href='#'>
            <span className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src='./src/assets/favicons/home.svg'
                alt='home'
              />
              <h2>Home</h2>
            </span>
          </a>
        </div>
        <div>
          <a href='#'>
            <span className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src='./src/assets/favicons/account.svg'
                alt='user account'
              />
              <h2>Account</h2>
            </span>
          </a>
        </div>
        <div>
          <a href='https://github.com/JaeGif' target='_blank' rel='noreferrer'>
            <span className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src='./src/assets/github.png'
                alt='user account'
              />
              <h2>Creator's Github</h2>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
