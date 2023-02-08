import React, { useContext, useEffect, useState } from 'react';
import uniqid from 'uniqid';
import { ApiContext, TokenContext } from '../../../App';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import UserPostPreview from './UserPostPreview';
import style from './userpublished.module.css';

function UserPublished({ user }) {
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);

  const [userSavedIdx, setUserSavedIdx] = useState(user.savedPosts);
  const [userSaved, setUserSaved] = useState([]);
  const [fetched, setFetched] = useState(false);

  const fetchSavedPosts = async (id) => {
    const res = await fetch(`${apiURL}/api/posts/${id}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    setFetched(true);
    return data.post;
  };

  useEffect(() => {
    let userSavedPosts = [];
    async function returnIntermediateData() {
      for (let i = 0; i < userSavedIdx.length; i++) {
        const post = await fetchSavedPosts(userSavedIdx[i]);
        userSavedPosts.push(post);
      }
      setUserSaved(userSaved.concat(userSavedPosts));
    }
    returnIntermediateData();
  }, []);

  console.log(userSaved);
  return (
    <>
      {fetched ? (
        userSaved.length ? (
          <div className={style.contentLayoutGrid}>
            {userSaved.map((post) => (
              <UserPostPreview key={uniqid()} post={post} />
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
