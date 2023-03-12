import React, { useContext, useEffect, useState } from 'react';
import { ApiContext, PathContext, TokenContext, UserContext } from '../../App';
import NotificationsLayout from './notificationsBar/NotificationsLayout';
import SearchLayout from './search/SearchLayout';
import style from './sidebar.module.css';

function Sidebar({
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
  const [isMinified, setIsMinified] = useState(false);
  const [open, setOpen] = useState('');
  const [newNotification, setNewNotification] = useState(false);

  const handleOpen = (openString) => {
    let modString = openString;
    if (openString === open) {
      modString = '';
    }
    setOpen(modString);
  };
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
  const switchOptionsExpansion = () => {
    switch (open) {
      case 'notifications':
        setIsMinified(true);
        setIsSearch(false);
        setIsNotifications(true);
        handleSeenNotifications();
        refreshLoggedInUserData();
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
  const handleSeenNotifications = () => {
    setSeen();

    // handle seen notifs once notifications are opened, new notification symbol is removed.
    setNewNotification(false);
  };
  useEffect(() => {
    // open sidebar modules
    switchOptionsExpansion();
  }, [open]);

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

  return (
    <div className={style.sidebarWrapper}>
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
                src={`./favicons/instagram.svg`}
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
            <span
              onClick={() => {
                goToHomePage();
              }}
              className={style.optionSpan}
            >
              <img
                className={style.optionsIcons}
                src={`./favicons/home.svg`}
                alt='home'
              />
              {isMinified ? <></> : <h2>Home</h2>}
            </span>
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
                src={`./favicons/search.svg`}
                alt='search'
              />
              {isMinified ? <></> : <h2>Search</h2>}
            </span>
          </div>

          <div>
            <span className={style.optionSpan}>
              <img
                className={style.optionsIcons}
                src={`./favicons/chat.svg`}
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
              <div className={style.notificationsContainer}>
                <img
                  className={style.optionsIcons}
                  src={`./favicons/favorite.svg`}
                  alt='notifications'
                />
                {newNotification ? (
                  <div className={style.newNotifications}> </div>
                ) : (
                  <></>
                )}
              </div>
              {isMinified ? <></> : <h2>Notifications</h2>}
            </span>
          </div>
          <div>
            <span className={style.optionSpan} onClick={() => newPostModal()}>
              <img
                className={`${style.newPostIcon}`}
                src={`./favicons/add.svg`}
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
                  src={`${apiURL}/${user.avatar}`}
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
                  src={`./github.png`}
                  alt='creators github'
                />
                {isMinified ? <></> : <h2>Creator's Github</h2>}
              </span>
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
      </div>
    </div>
  );
}

export default Sidebar;
