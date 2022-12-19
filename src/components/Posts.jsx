import React from 'react';
import { useEffect, useState, useRef } from 'react';
import Post from './Post';
import uniqid from 'uniqid';

function Posts() {
  const apiURL = import.meta.env.VITE_RAILWAY_URL;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const data = await fetch(`${apiURL}/api/posts`, { mode: 'cors' });
      const res = await data.json();
      setPosts(res);
    }
    fetchPosts();
  }, []);
  console.log(posts);
  if (typeof posts.posts !== 'undefined') {
    return (
      <div>
        {posts.posts.map((post) => (
          <Post key={uniqid()} postObj={post} />
        ))}
      </div>
    );
  } else {
    return <div>No data</div>;
  }
}

export default Posts;
