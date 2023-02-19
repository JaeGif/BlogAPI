import { useQueries, useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { ApiContext, TokenContext } from '../../../App';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';

function UserPublished({ user }) {
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);
  const [hasLength, setHasLength] = useState(false);
  const [userSavedIdx, setUserSavedIdx] = useState(user.savedPosts);
  const [userSaved, setUserSaved] = useState([]);

  console.log(user.savedPosts);
  useEffect(() => {
    console.log('pass');
    console.log(hasLength);
    console.log(user.savedPosts.length);
    if (user.savedPosts.length >= 0) {
      setHasLength(true);
    }
  }, []);
  const fetchSavedPosts = async (id) => {
    console.log(id);

    const res = await fetch(`${apiURL}/api/posts/${id}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    console.log(data);
    return data.post;
  };

  /*   useEffect(() => {
    let userSavedPosts = [];
    if (userSavedIdx.length) {
      async function returnIntermediateData() {
        for (let i = 0; i < userSavedIdx.length; i++) {
          const post = await fetchSavedPosts(userSavedIdx[i]);
          userSavedPosts.push(post);
        }
        setUserSaved(userSaved.concat(userSavedPosts));
      }
      console.log(userSavedIdx);
      returnIntermediateData();
    }
  }, []); */
  const savedPostsQueries = useQueries({
    queries: user.savedPosts.map((postId) => {
      return {
        queryKey: ['posts', { postid: postId }],
        queryFn: () => fetchSavedPosts(postId),
        enabled: !!postId,
      };
    }),
  });

  console.log(hasLength);

  console.log('saved,', savedPostsQueries);
  return (
    <>
      {hasLength ? (
        savedPostsQueries.data ? (
          <div className={style.contentLayoutGrid}>
            {savedPostsQueries.map((post) => (
              <UserPostPreview key={uniqid()} post={post.data} />
            ))}
          </div>
        ) : (
          <h2>Hmm, there's nothing here ...</h2>
        )
      ) : (
        <LoadingIcon />
      )}
    </>
  );
}

export default UserPublished;
