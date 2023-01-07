import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';

function UserPublished({ isUserPage, user }) {
  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;

  const [userPosts, setUserPosts] = useState([]);
  const [postsFound, setPostsFound] = useState(false);

  useEffect(() => {
    async function findPostsUserId() {
      const res = await fetch(`${apiURL}/api/posts?user=${user._id}`, {
        mode: 'cors',
      });
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
        <>
          Dev warning only waiting for post wtf is wrong something aint right
          here maybe check on fetchAPI's string, did ya change the string Jae?
          check that first always the problem handling 20 strings at once. Maybe
          you oughta add somethign to the project to manage dev build and
          production build? Nahhhhh just keep doing it this way Jae you're doing
          juuuuust fine.
        </>
      )}
    </div>
  );
}

export default UserPublished;
