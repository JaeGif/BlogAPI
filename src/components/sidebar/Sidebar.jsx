import React, { useContext } from 'react';
import { ApiContext, PathContext, UserContext } from '../../App';
import style from './sidebar.module.css';

function Sidebar({ newPostModal, openUserPageModal, goToHomePage }) {
  const user = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);

  return (
    <div>
      <div className={style.optionsSidebar}>
        <div className={style.brandContainer}>
          <h4 className={style.brandName}>Totally Not</h4>
          <h1 className={style.brandName}>Instagram</h1>
        </div>
        <div>
          <a href='#'>
            <span onClick={() => goToHomePage()} className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src={`${basePath}/assets/favicons/home.svg`}
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
                src={`${basePath}/assets/favicons/search.svg`}
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
                src={`${basePath}/assets/favicons/account.svg`}
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
                src={`${basePath}/assets/favicons/chat.svg`}
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
                src={`${basePath}/assets/favicons/favorite.svg`}
                alt='notifications'
              />
              <h2>Notifications</h2>
            </span>
          </a>
        </div>
        <div>
          <a>
            <span className={style.optionSpan} onClick={() => newPostModal()}>
              <img
                className={`${style.optionsIcons} ${style.newPostIcon}`}
                src={`${basePath}/assets/favicons/add.svg`}
                alt='New Post'
              />
              <h2>Create</h2>
            </span>
          </a>
        </div>
        <div>
          <a href='#'>
            <span
              onClick={() => openUserPageModal(user._id)}
              className={style.optionSpan}
            >
              <div className={`${style.avatarCircle}`}>
                <img
                  className={`${style.optionsImage}`}
                  src={`${apiURL}/uploads/${user._id}/avatar.jpg`}
                  alt='user home page'
                />
              </div>
              <h2>Profile</h2>
            </span>
          </a>
        </div>

        <div>
          <a href='https://github.com/JaeGif' target='_blank' rel='noreferrer'>
            <span className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src={`${basePath}/assets/github.png`}
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
