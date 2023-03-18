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

function Posts({ refresh, refreshFn, refreshLoggedInUserData }) {
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);

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
    const onScroll = function () {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        let scrollDistance = window.innerHeight / 10;
        window.scrollBy(0, -scrollDistance);

        if (!postsQuery.isFetchingNextPage) {
          postsQuery.fetchNextPage();
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [postsQuery.isFetching]);
  return (
    <>
      {postsQuery.data && (
        <div className={style.postsMargin}>
          {postsQuery.data.pages[0].posts.length === 0 && (
            <div className={style.postsMargin}>
              <p>You're not currently following anyone with active posts.</p>
            </div>
          )}
          {postsQuery.data.pages.map((page, pageI) => (
            <>
              {page.posts.map((post, i) => (
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
          <div className={style.infiniteCheckLoad}></div>
        </div>
      )}
    </>
  );
}

export default Posts;
