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
  const [isHome, setIsHome] = useState(true);
  const [isNew, setIsNew] = useState(false);

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
  useEffect(() => {
    // check for new notifications on first load
    for (let i = 0; i < user.notifications.length; i++) {
      if (!user.notifications[i].seen) {
        setNewNotification(true);
        return;
      }
    }
    setNewNotification(false);
  }, []);
  const switchOptionsExpansion = () => {
    switch (open) {
      case 'notifications':
        setIsSearch(false);
        setIsHome(false);
        setIsNew(false);
        setIsNotifications(true);
        handleSeenNotifications();
        refreshLoggedInUserData();
        break;
      case 'search':
        setIsNotifications(false);
        setIsSearch(true);
        setIsHome(false);
        setIsNew(false);

        break;
      case 'home':
        setIsHome(true);
        setIsNotifications(false);
        setIsSearch(false);
        setIsNew(false);

        break;
      case 'new':
        setIsHome(false);
        setIsNotifications(false);
        setIsSearch(false);
        setIsNew(true);
        break;
      default:
        setIsHome(true);
        setIsNotifications(false);
        setIsSearch(false);
        setIsNew(false);

        break;
    }
  };
  const handleOpen = (openString) => {
    let modString = openString;
    console.log(modString, open);
    if (openString === open) {
      modString = '';
    }
    setOpen(modString);
  };
  useEffect(() => {
    // open sidebar modules
    switchOptionsExpansion();
    console.log(open);
  }, [open]);
  return (
    <>
      <div className={style.upperMobileBarContainer}>
        <p className={style.stylizeLogo}>
          {width >= 375 && 'Totally Not '}Instagram
        </p>
        <div className={style.iconsWrapper}>
          <div
            className={style.notificationIndicatorWrapper}
            onClick={(e) => {
              e.stopPropagation();
              newPostModal('close');
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
            {newNotification && <div className={style.newNotifications}> </div>}
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
          onClick={(e) => {
            e.stopPropagation();
            newPostModal('close');

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
            newPostModal('close');

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
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleOpen('new');
            newPostModal();
          }}
        >
          <img
            className={`${style.newPostIcon}`}
            src={
              isNew
                ? `${basePath}/assets/favicons/add-blue.svg`
                : `${basePath}/assets/favicons/add-white.svg`
            }
            alt='New Post'
          />
        </div>

        <div className={style.childCentered}>
          <div
            onClick={() => {
              handleOpen('');
              newPostModal('close');
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
