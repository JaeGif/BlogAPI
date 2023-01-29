import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { ApiContext, TokenContext } from '../../../App';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';
import { useQuery } from '@tanstack/react-query';

function UserPublished({ user }) {
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);

  async function findPostsUserId() {
    const res = await fetch(
      `${apiURL}/api/posts?userid=${user._id}&returnLimit=0`,
      {
        mode: 'cors',
        headers: { Authorization: 'Bearer' + ' ' + token },
      }
    );
    console.log('finding new posts for', `${user.userName}`);
    const data = await res.json();
    return data.posts;
  }

  const userPostsQuery = useQuery({
    queryKey: ['posts', { userid: user._id }],
    queryFn: findPostsUserId,
  });

  return (
    <div className={style.contentLayoutGrid}>
      {userPostsQuery.isLoading ? (
        <LoadingIcon />
      ) : userPostsQuery.data.length ? (
        userPostsQuery.data.map((post) => (
          <UserPostPreview key={uniqid()} post={post} />
        ))
      ) : (
        <h2 className={style.noDataFoundMessage}>
          Hmm, there's nothing here ...
        </h2>
      )}
    </div>
  );
}

export default UserPublished;
