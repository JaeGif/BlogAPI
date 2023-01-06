import React, { useEffect, useState } from 'react';
import style from './userpagelayout.module.css';

import UserPublished from './profileSections/UserPublished';
import UserSaved from './profileSections/UserSaved';
import UserTagged from './profileSections/UserTagged';
import UserNavBar from './UserNavBar';
import UserPublicHeader from './profileSections/UserHeader';

function UserPageLayout() {
  // fetch user from user who is logged in

  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;

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
      const data = await fetch(`${apiURL}/api/users/${dummyUser._id}`);
    }
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
    <div className={style.layoutContainer}>
      <UserPublicHeader user={dummyUser} />
      <UserNavBar
        handleNavPosted={handleNavPosted}
        handleNavSaved={handleNavSaved}
        handleNavTagged={handleNavTagged}
        isPosted={isPosted}
        isSaved={isSaved}
        isTagged={isTagged}
      />
      {isPosted ? <UserPublished user={dummyUser} /> : <></>}
      {isSaved ? <UserSaved user={dummyUser} /> : <></>}
      {isTagged ? <UserTagged user={dummyUser} /> : <></>}
    </div>
  );
}

export default UserPageLayout;
