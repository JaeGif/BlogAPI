import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { ApiContext } from '../../../App';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';

function UserTagged({ user }) {
  const apiURL = useContext(ApiContext);
  const [userTagged, setUserTagged] = useState(user.taggedPosts);

  return (
    <>
      {userTagged.length ? (
        <div className={style.contentLayoutGrid}>
          {userTagged.map((post) => (
            <UserPostPreview key={uniqid()} post={post} />
          ))}
        </div>
      ) : (
        <h2>Hmm, there's nothing here ...</h2>
      )}
    </>
  );
}

export default UserTagged;
