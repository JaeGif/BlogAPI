import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { ApiContext } from '../../../App';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';

function UserPublished({ user }) {
  const apiURL = useContext(ApiContext);

  const [userPosts, setUserPosts] = useState([]);
  const [postsFound, setPostsFound] = useState(false);

  useEffect(() => {
    async function findPostsUserId() {
      const res = await fetch(
        `${apiURL}/api/posts?user=${user._id}&returnLimit=18`,
        {
          mode: 'cors',
        }
      );
      const data = await res.json();

      setUserPosts(data.posts);
    }
    findPostsUserId();
  }, []);

  useEffect(() => {
    if (userPosts.length) {
      setPostsFound(true);
    }
  }, [userPosts]);

  return (
    <div className={style.contentLayoutGrid}>
      {postsFound ? (
        userPosts.map((post) => <UserPostPreview key={uniqid()} post={post} />)
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
}

export default UserPublished;
