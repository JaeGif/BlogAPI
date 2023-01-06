import React, { useEffect, useState } from 'react';
import style from './userpagelayout.module.css';

import UserPublished from './profileSections/UserPublished';
import UserSaved from './profileSections/UserSaved';
import UserTagged from './profileSections/UserTagged';
import UserNavBar from './UserNavBar';
import UserPublicHeader from './profileSections/UserHeader';
import LoadingIcon from '../utlity_Components/LoadingIcon';

function UserPageLayout() {
  // fetch user from user who is logged in

  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;

  const [user, setUser] = useState();
  const [isUser, setIsUser] = useState(false);

  const dummyUser = {
    avatar: {
      id: '9263f45c70879dbc56faa5c4',
      url: 'https://instaapi-production.up.railway.app/uploads/823fce52b33a845ef7554dd9/avatar.jpg',
    },
    _id: '823fce52b33a845ef7554dd9',
    firstName: 'Neal',
    lastName: 'Morissette',
    email: 'Tia_Kris@hotmail.com',
    userName: 'Eldridge_Feest40',
    isAdmin: false,
  };

  useEffect(() => {
    async function findUserById() {
      const res = await fetch(`${apiURL}/api/users/${dummyUser._id}`, {
        mode: 'cors',
      });
      const data = await res.json();
      setUser(data);
      setIsUser(true);
    }
    findUserById();
  }, []);

  // default state of user page layout
  const [isPosted, setIsPosted] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isTagged, setIsTagged] = useState(false);

  const handleNavPosted = () => {
    setIsPosted(true);
    setIsSaved(false);
    setIsTagged(false);
  };
  const handleNavSaved = () => {
    setIsPosted(false);
    setIsSaved(true);
    setIsTagged(false);
  };
  const handleNavTagged = () => {
    setIsPosted(false);
    setIsSaved(false);
    setIsTagged(true);
  };

  return (
    <>
      {isUser ? (
        <div className={style.layoutContainer}>
          <UserPublicHeader user={user} />
          <UserNavBar
            handleNavPosted={handleNavPosted}
            handleNavSaved={handleNavSaved}
            handleNavTagged={handleNavTagged}
            isPosted={isPosted}
            isSaved={isSaved}
            isTagged={isTagged}
          />
          {isPosted ? <UserPublished user={user} /> : <></>}
          {isSaved ? <UserSaved user={user} /> : <></>}
          {isTagged ? <UserTagged user={user} /> : <></>}
        </div>
      ) : (
        <LoadingIcon />
      )}
    </>
  );
}

export default UserPageLayout;
