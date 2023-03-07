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
  const [limitCounter, setLimitCounter] = useState(0);
  const { ref, inView } = useInView();

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

  /*   const postsForUserQuery = useQuery({
    queryKey: ['posts', { u: loggedInUser._id }],
    queryFn: fetchPosts,
  }); */

  const getMorePosts = () => {
    setLimitCounter(limitCounter + 1);
  };

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['posts', { u: loggedInUser._id }],
    async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${apiURL}/api/posts?u=${loggedInUser._id}&page=${pageParam}`,
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
    { getNextPageParam: (lastPage, pages) => lastPage.nextCursor ?? undefined }
  );

  useEffect(() => {
    if (inView) {
      console.log('in view');
      fetchNextPage();
    }
    console.log('checking');
  }, [inView]);

  return (
    <>
      {isFetching && (
        <div className={style.infiniteCheckLoad}>
          <LoadingIcon />
        </div>
      )}
      {data.pages[0].posts.length ? (
        <div className={style.postsMargin}>
          {data.pages.map((page) => (
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
