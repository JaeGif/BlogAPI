import React, { useEffect, useState, useContext } from 'react';
import style from './mobileBar.module.css';
import { UserContext, ApiContext, PathContext, TokenContext } from '../../App';
import SearchLayout from './search/SearchLayout';
import NotificationsLayout from './notificationsBar/NotificationsLayout';

function MobileBar({
  newPostModal,
  openUserPageModal,
  goToHomePage,
  refreshLoggedInUserData,
}) {
  const user = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);

  const [isNotifications, setIsNotifications] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [open, setOpen] = useState('home');
  const [newNotification, setNewNotification] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const width = window.innerWidth;

  const setSeen = async () => {
    let data = new URLSearchParams();
    data.append('seen', 'true');
    const res = await fetch(`${apiURL}/api/users/${user._id}`, {
      mode: 'cors',
      method: 'PUT',
      body: data,
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const notificationsSeen = await res.json();
  };
  const handleSeenNotifications = () => {
    setSeen();

    // handle seen notifs once notifications are opened, new notification symbol is removed.
    setNewNotification(false);
  };
  const switchOptionsExpansion = () => {
    switch (open) {
      case 'notifications':
        setIsSearch(false);
        setIsHome(false);
        setIsNotifications(true);
        handleSeenNotifications();
        refreshLoggedInUserData();
        break;
      case 'search':
        setIsNotifications(false);
        setIsSearch(true);
        setIsHome(false);
        break;
      case 'home':
        setIsHome(true);
        setIsNotifications(false);
        setIsSearch(false);
      default:
        setIsNotifications(false);
        setIsSearch(false);
        break;
    }
  };
  const handleOpen = (openString) => {
    let modString = openString;
    if (openString === open) {
      modString = '';
    }
    setOpen(modString);
  };
  useEffect(() => {
    // open sidebar modules
    switchOptionsExpansion();
  }, [open]);
  return (
    <>
      <div className={style.upperMobileBarContainer}>
        <p className={style.stylizeLogo}>
          {width >= 375 && 'Totally Not '}Instagram
        </p>
        <div className={style.iconsWrapper}>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleOpen('notifications');
            }}
          >
            <img
              className={style.icons}
              src={
                isNotifications
                  ? `${basePath}/assets/favicons/favorite-red.svg`
                  : `${basePath}/assets/favicons/favorite-white.svg`
              }
              alt='notifications'
            />
          </div>
          <div>
            <img
              className={style.icons}
              src={`${basePath}/assets/favicons/messages-white.svg`}
              alt='messages'
            />
          </div>
        </div>
      </div>

      <div className={style.mobileBarContainer}>
        <div
          onClick={() => {
            handleOpen('home');
            goToHomePage();
          }}
          className={style.iconWrapper}
        >
          <img
            className={style.icons}
            src={
              isHome
                ? `${basePath}/assets/favicons/home-blue.svg`
                : `${basePath}/assets/favicons/home-white.svg`
            }
            alt='home'
          />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleOpen('search');
          }}
        >
          <img
            className={style.icons}
            src={
              isSearch
                ? `${basePath}/assets/favicons/search-blue.svg`
                : `${basePath}/assets/favicons/search-white.svg`
            }
            alt='search'
          />
        </div>
        <div>
          <img
            className={`${style.newPostIcon}`}
            src={`${basePath}/assets/favicons/add-white.svg`}
            alt='New Post'
          />
        </div>

        <div className={style.childCentered}>
          <div
            onClick={() => {
              handleOpen('');
              openUserPageModal(user._id);
            }}
            className={style.userPageIconWrapper}
          >
            <img
              className={`${style.userPageIcon}`}
              src={`${apiURL}/${user.avatar}`}
              alt='user home page'
            />
          </div>
        </div>
        <div>
          <a href='https://github.com/JaeGif' target='_blank' rel='noreferrer'>
            <img
              className={style.githubIcon}
              src={`${basePath}/assets/favicons/github-white.svg`}
              alt='creators github'
            />
          </a>
        </div>
      </div>
      {isNotifications && (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleOpen('');
            }}
            className={style.closingWrapper}
          ></div>
          <NotificationsLayout handleOpen={handleOpen} />
        </>
      )}
      {isSearch && (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleOpen('');
            }}
            className={style.closingWrapper}
          ></div>
          <SearchLayout handleOpen={handleOpen} />
        </>
      )}
    </>
  );
}

export default MobileBar;
