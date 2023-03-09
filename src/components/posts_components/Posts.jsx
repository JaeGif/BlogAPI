import React, { useContext } from 'react';
import { useEffect, useState, useRef } from 'react';
import Post from './Post';
import uniqid from 'uniqid';
import LoadingIcon from '../utlity_Components/LoadingIcon';
import style from './posts.module.css';
import { ApiContext, UserContext, TokenContext } from '../../App';
import {
  useInfiniteQuery,
  QueryClient,
  useQuery,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

function Posts({ refresh, refreshFn, refreshLoggedInUserData }) {
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const { ref, inView } = useInView();

  const returnLimit = 5;

  const postsQuery = useInfiniteQuery(
    ['posts', { u: loggedInUser._id }],
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${apiURL}/api/posts?u=${loggedInUser._id}&cursor=${pageParam}&returnLimit=${returnLimit}`,
        {
          mode: 'cors',
          headers: {
            Authorization: 'Bearer' + ' ' + token,
          },
        }
      );
      const data = await res.json();
      return data;
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor ?? undefined,
      getPreviousPageParam: (firstPage, pages) =>
        firstPage.previousCursor ?? undefined,
    }
  );

  useEffect(() => {
    if (inView) {
      postsQuery.fetchNextPage();
    }
    console.log(postsQuery);
  }, [inView]);

  return (
    <>
      {postsQuery.data ? (
        <div className={style.postsMargin}>
          {postsQuery.data.pages.map((page) => (
            <>
              {page.posts.map((post) => (
                <>
                  <Post
                    key={uniqid()}
                    postObj={post}
                    refreshLoggedInUserData={refreshLoggedInUserData}
                  />
                </>
              ))}
            </>
          ))}
          <br />
          <br />
          <div ref={ref} className={style.infiniteLoadMarker} />
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
