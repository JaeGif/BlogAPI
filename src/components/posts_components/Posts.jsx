import React, { useContext } from 'react';
import { useEffect, useState, useRef } from 'react';
import Post from './Post';
import uniqid from 'uniqid';
import LoadingIcon from '../utlity_Components/LoadingIcon';
import style from './posts.module.css';
import { ApiContext, UserContext, TokenContext } from '../../App';
import { useQuery } from '@tanstack/react-query';

function Posts({ refresh, refreshFn }) {
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const [limitCounter, setLimitCounter] = useState(0);
  /* 
  useEffect(() => {

    fetchPosts();
  }, [refresh]); */

  async function fetchPosts() {
    const res = await fetch(`${apiURL}/api/posts?u=${loggedInUser._id}`, {
      mode: 'cors',
      headers: {
        Authorization: 'Bearer' + ' ' + token,
      },
    });
    const data = await res.json();
    return data;
  }

  const postsForUserQuery = useQuery({
    queryKey: ['posts', { u: loggedInUser._id }],
    queryFn: fetchPosts,
  });

  const getMorePosts = () => {
    setLimitCounter(limitCounter + 1);
  };

  console.log(postsForUserQuery.data.posts);

  return (
    <>
      {postsForUserQuery.isLoading ? (
        <div className={style.loadingIconContainer}>
          <LoadingIcon />
        </div>
      ) : postsForUserQuery.data.posts.length ? (
        <div className={style.postsMargin}>
          {postsForUserQuery.data.posts.map((post) => (
            <Post key={uniqid()} postObj={post} refresh={refreshFn} />
          ))}
        </div>
      ) : (
        <div className={style.postsMargin}>
          <p>You're not currently following anyone with active posts.</p>
        </div>
      )}
    </>
  );
}

export default Posts;
