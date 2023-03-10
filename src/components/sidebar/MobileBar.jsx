import React, { useEffect, useState, useContext } from 'react';
import style from './mobileBar.module.css';
import { UserContext, ApiContext, PathContext, TokenContext } from '../../App';

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
  const [isMinified, setIsMinified] = useState(false);
  const [open, setOpen] = useState('');
  const [newNotification, setNewNotification] = useState(false);

  return (
    <div className={style.mobileBarContainer}>
      <div className={style.iconWrapper}>
        <img
          className={style.icons}
          src={`${basePath}/assets/favicons/home-white.svg`}
          alt='home'
        />
      </div>
      <div>
        <img
          className={style.icons}
          src={`${basePath}/assets/favicons/favorite-white.svg`}
          alt='notifications'
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
        <div className={style.userPageIconWrapper}>
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
  );
}

export default MobileBar;
