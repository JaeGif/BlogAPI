import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { ApiContext } from '../../../App';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';

function UserTagged({ user }) {
  const apiURL = useContext(ApiContext);
  const [userTaggedIdx, setUserTaggedIdx] = useState(user.taggedPosts);
  const [userTagged, setUserTagged] = useState([]);

  useEffect(() => {
    for (let i = 0; i < userTaggedIdx.length; i++) {
      fetchPostById(userTaggedIdx[i]);
    }
  }, [userTaggedIdx]);
  const fetchPostById = async (id) => {
    const res = await fetch(`${apiURL}/api/posts/${id}`);
    const data = await res.json();
    setUserTagged(userTagged.concat(data.post));
  };
  return (
    <>
      {userTagged.length ? (
        <div className={style.contentLayoutGrid}>
          {userTagged.map((post) => (
            <UserPostPreview key={uniqid()} post={post} />
          ))}
        </div>
      ) : (
        <h2>Hmm, there's nothing here ...</h2>
      )}
    </>
  );
}

export default UserTagged;
