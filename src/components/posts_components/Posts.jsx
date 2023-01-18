import React, { useContext } from 'react';
import { useEffect, useState, useRef } from 'react';
import Post from './Post';
import uniqid from 'uniqid';
import LoadingIcon from '../utlity_Components/LoadingIcon';
import style from './posts.module.css';
import { ApiContext, UserContext } from '../../App';

function Posts({ refresh, refreshFn }) {
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [limitCounter, setLimitCounter] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      const data = await fetch(`${apiURL}/api/posts?u=${loggedInUser._id}`, {
        mode: 'cors',
      });
      const res = await data.json();
      setPosts(res);
    }
    fetchPosts();
  }, [refresh]);

  const getMorePosts = () => {
    setLimitCounter(limitCounter + 1);
  };
  if (typeof posts.posts !== 'undefined') {
    return (
      <div className={style.postsMargin}>
        {posts.posts.map((post) => (
          <Post key={uniqid()} postObj={post} refresh={refreshFn} />
        ))}
      </div>
    );
  } else {
    return (
      <div className={style.loadingIconContainer}>
        <LoadingIcon />
      </div>
    );
  }
}

export default Posts;
