import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import UserPostPreview from './UserPostPreview';

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
    <div>
      {postsFound ? (
        userPosts.map((post) => <UserPostPreview post={post} />)
      ) : (
        <>Waiting</>
      )}
    </div>
  );
}

export default UserPublished;
