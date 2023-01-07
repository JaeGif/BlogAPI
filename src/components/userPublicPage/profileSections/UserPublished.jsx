import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';

function UserPublished({ isUserPage, user }) {
  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;

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
      console.log(`${apiURL}/${userPosts[1].image.url}`);
    }
  }, [userPosts]);

  return (
    <div className={style.contentLayoutGrid}>
      {postsFound ? (
        userPosts.map((post) => <UserPostPreview post={post} />)
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
}

export default UserPublished;
