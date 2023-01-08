import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { ApiContext } from '../../../App';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';

function UserPublished({ user }) {
  const apiURL = useContext(ApiContext);
  const [userSaved, seUserSaved] = useState(user.savedPosts);

  return (
    <div className={style.contentLayoutGrid}>
      {userSaved.map((post) => (
        <UserPostPreview key={uniqid()} post={post} />
      ))}
    </div>
  );
}

export default UserPublished;
