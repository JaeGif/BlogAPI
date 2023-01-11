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
        `${apiURL}/api/posts?userid=${user._id}&returnLimit=0`,
        {
          mode: 'cors',
        }
      );
      console.log('finding new posts for', `${user.userName}`);
      const data = await res.json();
      console.log(data.posts);
      setPostsFound(true);
      setUserPosts(data.posts);
    }
    findPostsUserId();
    console.log(userPosts);
  }, []);

  return (
    <div className={style.contentLayoutGrid}>
      {postsFound ? (
        userPosts.length ? (
          userPosts.map((post) => (
            <UserPostPreview key={uniqid()} post={post} />
          ))
        ) : (
          <h2 className={style.noDataFoundMessage}>
            Hmm, there's nothing here ...
          </h2>
        )
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
}

export default UserPublished;
