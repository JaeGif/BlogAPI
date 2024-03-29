import React, { useContext, useEffect, useState } from 'react';
import style from './userpagelayout.module.css';
import { useQuery } from '@tanstack/react-query';

import UserPublished from './profileSections/UserPublished';
import UserSaved from './profileSections/UserSaved';
import UserTagged from './profileSections/UserTagged';
import UserNavBar from './UserNavBar';
import UserPublicHeader from './profileSections/UserHeader';
import LoadingIcon from '../utlity_Components/LoadingIcon';
import { ApiContext, TokenContext } from '../../App';

function UserPageLayout({ user, openEditUser }) {
  // fetch user from user who is logged in
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);

  async function findUserById() {
    const res = await fetch(`${apiURL}/api/users/${user._id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    return data.user;
  }

  const userQuery = useQuery({
    queryKey: ['user', { userid: user._id }],
    queryFn: findUserById,
  });
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
      {userQuery.data ? (
        <div className={style.layoutContainer}>
          <UserPublicHeader
            openEditUser={openEditUser}
            userData={userQuery.data}
          />
          <UserNavBar
            handleNavPosted={handleNavPosted}
            handleNavSaved={handleNavSaved}
            handleNavTagged={handleNavTagged}
            isPosted={isPosted}
            isSaved={isSaved}
            isTagged={isTagged}
          />
          {isPosted ? <UserPublished user={userQuery.data} /> : <></>}
          {isSaved ? <UserSaved user={userQuery.data} /> : <></>}
          {isTagged ? <UserTagged user={userQuery.data} /> : <></>}
        </div>
      ) : userQuery.isLoading ? (
        <LoadingIcon />
      ) : (
        <>There's something wrong here... 404</>
      )}
    </>
  );
}

export default UserPageLayout;
