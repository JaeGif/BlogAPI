import React, { useContext, useState, useEffect } from 'react';
import style from './userheader.module.css';
import { ApiContext, UserContext } from '../../../App';

function UserPublicHeader({ user }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followsCount, setFollowsCount] = useState(0);

  useEffect(() => {
    if (user._id === loggedInUser._id) {
      setIsCurrentUser(true);
    }
    async function countUserPosts() {
      const res = await fetch(
        `${apiURL}/api/posts?user=${user._id}&returnLimit=0`
      );
      const data = await res.json();
      setPostCount(data.posts.length);
    }
    countUserPosts();
  });

  return (
    <div className={style.profileAvatarContainer}>
      <div className={style.profileAvatarWrapper}>
        <img
          className={style.avatarImg}
          src={`${apiURL}/uploads/${user._id}/avatar.jpg`}
        />
      </div>
      <div className={style.optionsColumn}>
        <div className={style.optionsWrapper}>
          <p className={style.userName}>{user.userName}</p>
          {isCurrentUser ? (
            <div>
              <button className={style.editButton}>Edit Profile</button>
            </div>
          ) : (
            <div>
              <button>Follow</button>
            </div>
          )}
        </div>
        <div className={style.userStatsContainer}>
          <p>
            <em className={style.stats}>{postCount}</em> posts
          </p>
          <p>
            <em className={style.stats}>{followerCount}</em> followers
          </p>
          <p>
            <em className={style.stats}>{followsCount}</em> following
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserPublicHeader;
