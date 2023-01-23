import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { ApiContext } from '../../../App';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';
import { useQuery } from '@tanstack/react-query';
function UserTagged({ user }) {
  const apiURL = useContext(ApiContext);
  const [userTaggedIdx, setUserTaggedIdx] = useState(user.taggedPosts);
  const [userTagged, setUserTagged] = useState([]);

  useEffect(() => {
    let userTaggedPosts = [];
    async function returnIntermediateData() {
      for (let i = 0; i < userTaggedIdx.length; i++) {
        const post = await fetchPostById(userTaggedIdx[i]);
        userTaggedPosts.push(post);
      }
      setUserTagged(userTagged.concat(userTaggedPosts));
    }
    returnIntermediateData();
  }, []);

  const fetchPostById = async (id) => {
    const res = await fetch(`${apiURL}/api/posts/${id}`);
    const data = await res.json();
    return data.post;
  };

  return (
    <>
      {userTaggedIdx.length ? (
        userTagged.length ? (
          <div className={style.contentLayoutGrid}>
            {userTagged.map((post) => (
              <UserPostPreview key={uniqid()} post={post} />
            ))}
          </div>
        ) : (
          <LoadingIcon />
        )
      ) : (
        <h2>Hmm, there's nothing here...</h2>
      )}
    </>
  );
}

export default UserTagged;
