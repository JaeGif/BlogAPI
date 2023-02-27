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

  useEffect(() => {
    console.log('pass');
    console.log(hasLength);
    console.log(user.savedPosts.length);
    if (user.savedPosts.length > 0) {
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
    return data.post;
  };
  const savedPostsQueries = useQueries({
    queries: user.savedPosts.map((postId) => {
      return {
        queryKey: ['posts', { postid: postId }],
        queryFn: () => fetchSavedPosts(postId),
        enabled: !!postId,
      };
    }),
  });

  return (
    <>
      {hasLength ? (
        savedPostsQueries[0].isSuccess ? (
          <div className={style.contentLayoutGrid}>
            {savedPostsQueries.map((post) => (
              <UserPostPreview key={uniqid()} post={post.data} />
            ))}
          </div>
        ) : (
          <LoadingIcon />
        )
      ) : (
        <h2>Hmm, there's nothing here ...</h2>
      )}
    </>
  );
}

export default UserPublished;
