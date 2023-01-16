import React, { useContext, useEffect, useState } from 'react';
import style from './userpagelayout.module.css';

import UserPublished from './profileSections/UserPublished';
import UserSaved from './profileSections/UserSaved';
import UserTagged from './profileSections/UserTagged';
import UserNavBar from './UserNavBar';
import UserPublicHeader from './profileSections/UserHeader';
import LoadingIcon from '../utlity_Components/LoadingIcon';
import { ApiContext } from '../../App';

function UserPageLayout({ user }) {
  // fetch user from user who is logged in
  const apiURL = useContext(ApiContext);

  const [userData, setUserData] = useState();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    setIsUser(false);
    console.log('rerun data search');
    async function findUserById() {
      const res = await fetch(`${apiURL}/api/users/${user._id}`, {
        mode: 'cors',
      });
      const data = await res.json();
      setUserData(data.user);
      setIsUser(true);
    }
    findUserById();
  }, [user]);

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
          {isPosted ? <UserPublished user={userData} /> : <></>}
          {isSaved ? <UserSaved user={userData} /> : <></>}
          {isTagged ? <UserTagged user={userData} /> : <></>}
        </div>
      ) : (
        <LoadingIcon />
      )}
    </>
  );
}

export default UserPageLayout;
