import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { ApiContext, TokenContext } from '../../../App';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';
import { useQuery, useQueries } from '@tanstack/react-query';
function UserTagged({ user }) {
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);
  const [hasLength, setHasLength] = useState(false);

  useEffect(() => {
    if (user.taggedPosts.length > 0) {
      setHasLength(true);
    }
  }, []);

  const fetchPostById = async (id) => {
    console.log('fetching');
    const res = await fetch(`${apiURL}/api/posts/${id}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    return data.post;
  };

  const taggedPostsQueries = useQueries({
    queries: user.taggedPosts.map((tagId) => {
      return {
        queryKey: ['posts', { taggedid: tagId }],
        queryFn: () => fetchPostById(tagId),
        enabled: !!tagId,
      };
    }),
  });
  return (
    <>
      {hasLength ? (
        taggedPostsQueries[0].isSuccess ? (
          <div className={style.contentLayoutGrid}>
            {taggedPostsQueries.map((post) => (
              <UserPostPreview
                key={uniqid()}
                post={post.data}
                userData={user}
              />
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

export default UserTagged;
