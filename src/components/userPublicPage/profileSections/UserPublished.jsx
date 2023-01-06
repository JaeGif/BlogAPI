import React, { useEffect, useState } from 'react';

function UserPublished({ isUserPage, user }) {
  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const localURL = import.meta.env.VITE_LOCAL_URL;

  const [userPosts, setUserPosts] = useState();

  useEffect(() => {
    async function findPostsUserId() {
      const res = await fetch(`${apiURL}/api/posts?user=${user._id}`, {
        mode: 'cors',
      });
      const data = await res.json();
      setUserPosts(data);
    }
    findPostsUserId();
    console.log(userPosts);
  }, []);

  return <div>posts</div>;
}

export default UserPublished;
