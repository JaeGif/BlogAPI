import React, { useContext, useState, useEffect } from 'react';
import style from './userheader.module.css';
import { ApiContext, UserContext } from '../../../App';

function UserPublicHeader({ user }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(user.followers.length);
  const [followsCount, setFollowsCount] = useState(user.following.length);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user._id === loggedInUser._id) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }
    async function countUserPosts() {
      const res = await fetch(
        `${apiURL}/api/posts?userid=${user._id}&returnLimit=0`
      );
      const data = await res.json();
      setPostCount(data.posts.length);
    }
    for (let i = 0; i < loggedInUser.following.length; i++) {
      if (loggedInUser.following[i] === user._id) {
        setIsFollowing(true);
        break;
      }
    }
    countUserPosts();
  }, []);

  const addFollowingToCurrentUser = async () => {
    // first add to logged in users list.
    setIsFollowing(true);
    console.log('follow to current');

    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({ _id: user._id, type: 'following/add' })
    );
    const followingRes = await fetch(
      `${apiURL}/api/users/${loggedInUser._id}`,
      {
        mode: 'cors',
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };
  const addFollowerToUser = async () => {
    // add follower to this user
    console.log('follow to user');

    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({ _id: loggedInUser._id, type: 'follower/add' })
    );
    const followingRes = await fetch(`${apiURL}/api/users/${user._id}`, {
      mode: 'cors',
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };
  const removeFollowingFromCurrentUser = async () => {
    setIsFollowing(false);
    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({
        _id: user._id,
        type: 'following/remove',
      })
    );
    const followingRes = await fetch(
      `${apiURL}/api/users/${loggedInUser._id}`,
      {
        mode: 'cors',
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };
  const removeFollowerFromUser = async () => {
    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({
        _id: user._id,
        type: 'follower/remove',
      })
    );
    const followingRes = await fetch(`${apiURL}/api/users/${user._id}`, {
      mode: 'cors',
      method: 'PUT',
      body: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };
  const handleFollow = () => {
    console.log('follow send');
    addFollowerToUser();
    addFollowingToCurrentUser();
  };

  const handleUnFollow = () => {
    console.log('unfollow send');

    removeFollowerFromUser();
    removeFollowingFromCurrentUser();
  };

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
              <button
                onClick={
                  isFollowing ? () => handleUnFollow() : () => handleFollow()
                }
                className={
                  isFollowing
                    ? `${style.unFollowButton} ${style.followButton}`
                    : `${style.followButton}`
                }
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
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
