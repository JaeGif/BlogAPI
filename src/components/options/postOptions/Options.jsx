import React, { useContext, useEffect, useState } from 'react';
import style from './options.module.css';
import {
  UserContext,
  ApiContext,
  PathContext,
  TokenContext,
  ProfileContext,
} from '../../../App';
function Options({ post, handleCloseOptions }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const basePath = useContext(PathContext);
  const token = useContext(TokenContext);
  const profileCheckout = useContext(ProfileContext);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  useEffect(() => {
    if (loggedInUser._id === post.user) {
      setIsCurrentUser(true);
    }
  }, []);
  const handleUnfollow = () => {};
  const handleDelete = () => {};

  return (
    <div className={style.optionsWrapper}>
      <div className={`${style.center} ${style.danger} ${style.bottomBorder}`}>
        Unfollow
      </div>
      {isCurrentUser && (
        <>
          <div
            className={`${style.center} ${style.bottomBorder} ${style.danger}`}
          >
            Delete
          </div>
          <div
            className={`${style.center} ${style.bottomBorder} ${style.neutral}`}
          >
            Edit
          </div>
        </>
      )}
      <div className={`${style.center} ${style.bottomBorder}`}>Full Post</div>

      <div onClick={() => handleCloseOptions()} className={`${style.center}`}>
        Close
      </div>
    </div>
  );
}

export default Options;
