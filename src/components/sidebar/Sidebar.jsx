import React, { useContext, useEffect, useState } from 'react';
import { ApiContext, PathContext, UserContext } from '../../App';
import NotificationsLayout from './notificationsBar/NotificationsLayout';
import SearchLayout from './search/SearchLayout';
import style from './sidebar.module.css';

function Sidebar({ newPostModal, openUserPageModal, goToHomePage }) {
  const user = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const [isNotifications, setIsNotifications] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isMinified, setIsMinified] = useState(false);
  const [open, setOpen] = useState('');

  const handleOpen = (openString) => {
    let modString = openString;
    if (openString === open) {
      modString = '';
    }
    setOpen(modString);
  };
  const switchOptionsExpansion = () => {
    switch (open) {
      case 'notifications':
        setIsMinified(true);
        setIsSearch(false);
        setIsNotifications(true);
        break;
      case 'search':
        setIsMinified(true);
        setIsNotifications(false);
        setIsSearch(true);
        break;
      default:
        setIsMinified(false);
        setIsNotifications(false);
        setIsSearch(false);
        break;
    }
  };
  useEffect(() => {
    switchOptionsExpansion();
  }, [open]);

  return (
    <div>
      <div
        className={
          isMinified
            ? `${style.sideBarContainer} ${style.outlineExpanded}`
            : `${style.sideBarContainer}`
        }
      >
        <div
          className={
            isMinified ? `${style.minifiedBar}` : `${style.optionsSidebar}`
          }
        >
          <div className={style.brandContainer}>
            {isMinified ? (
              <img
                className={`${style.optionsIcons} ${style.instagramIcon}`}
                src={`${basePath}/assets/favicons/instagram.svg`}
                alt='instagram'
              />
            ) : (
              <>
                <h4 className={style.brandName}>Totally Not</h4>
                <h1 className={style.brandName}>Instagram</h1>
              </>
            )}
          </div>
          <div>
            <a href='#'>
              <span onClick={() => goToHomePage()} className={style.optionSpan}>
                <img
                  className={style.optionsIcons}
                  src={`${basePath}/assets/favicons/home.svg`}
                  alt='home'
                />
                {isMinified ? <></> : <h2>Home</h2>}
              </span>
            </a>
          </div>
          <div>
            <span
              className={style.optionSpan}
              onClick={(e) => {
                e.stopPropagation();
                handleOpen('search');
              }}
            >
              <img
                className={style.optionsIcons}
                src={`${basePath}/assets/favicons/search.svg`}
                alt='search'
              />
              {isMinified ? <></> : <h2>Search</h2>}
            </span>
          </div>

          <div>
            <span className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src={`${basePath}/assets/favicons/chat.svg`}
                alt='messages'
              />
              {isMinified ? <></> : <h2>Messages</h2>}
            </span>
          </div>
          <div>
            <span
              className={style.optionSpan}
              onClick={(e) => {
                e.stopPropagation();
                handleOpen('notifications');
              }}
            >
              <img
                className={style.optionsIcons}
                src={`${basePath}/assets/favicons/favorite.svg`}
                alt='notifications'
              />
              {isMinified ? <></> : <h2>Notifications</h2>}
            </span>
          </div>
          <div>
            <span className={style.optionSpan} onClick={() => newPostModal()}>
              <img
                className={`${style.newPostIcon}`}
                src={`${basePath}/assets/favicons/add.svg`}
                alt='New Post'
              />
              {isMinified ? <></> : <h2>Create</h2>}
            </span>
          </div>
          <div>
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
              {isMinified ? <></> : <h2>Profile</h2>}
            </span>
          </div>
          <div>
            <a
              href='https://github.com/JaeGif'
              target='_blank'
              rel='noreferrer'
            >
              <span className={style.optionSpan}>
                <img
                  className={style.githubIcon}
                  src={`${basePath}/assets/github.png`}
                  alt='creators github'
                />
                {isMinified ? <></> : <h2>Creator's Github</h2>}
              </span>
            </a>
          </div>
        </div>
        {isNotifications ? <NotificationsLayout /> : <></>}
        {isSearch ? <SearchLayout /> : <></>}
      </div>
    </div>
  );
}

export default Sidebar;
