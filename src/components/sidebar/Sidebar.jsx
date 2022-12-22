import React from 'react';
import style from './sidebar.module.css';

function Sidebar() {
  return (
    <div>
      <div className={style.optionsSidebar}>
        <div className={style.brandContainer}>
          <h5 className={style.brandName}>Totally Not</h5>
          <h1 className={style.brandName}>Instagram</h1>
        </div>
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
                src='./src/assets/favicons/search.svg'
                alt='search'
              />
              <h2>Search</h2>
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
          <a href='#'>
            <span className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src='./src/assets/favicons/chat.svg'
                alt='messages'
              />
              <h2>Messages</h2>
            </span>
          </a>
        </div>
        <div>
          <a href='#'>
            <span className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src='./src/assets/favicons/favorite.svg'
                alt='notifications'
              />
              <h2>Notifications</h2>
            </span>
          </a>
        </div>
        <div>
          <a href='#'>
            <span className={style.optionSpan}>
              <img
                className={`${style.optionsIcons} ${style.newPostIcon}`}
                src='./src/assets/favicons/add.svg'
                alt='New Post'
              />
              <h2>Create</h2>
            </span>
          </a>
        </div>
        <div>
          <a href='#'>
            <span className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src='./src/assets/favicons/fingerprint.svg'
                alt='user account'
              />
              <h2>Profile</h2>
            </span>
          </a>
        </div>

        <div>
          <a href='https://github.com/JaeGif' target='_blank' rel='noreferrer'>
            <span className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src='./src/assets/github.png'
                alt='creators github'
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
