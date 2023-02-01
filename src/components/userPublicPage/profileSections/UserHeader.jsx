import React, { useContext, useState, useEffect } from 'react';
import style from './userheader.module.css';
import { ApiContext, TokenContext, UserContext } from '../../../App';
import { useQuery } from '@tanstack/react-query';

function UserPublicHeader({ user, openEditUser }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [followerCount, setFollowerCount] = useState(user.followers.length);
  const [followsCount, setFollowsCount] = useState(user.following.length);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user._id === loggedInUser._id) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }

    for (let i = 0; i < loggedInUser.following.length; i++) {
      if (loggedInUser.following[i] === user._id) {
        setIsFollowing(true);
        break;
      }
    }
  });

  async function countUserPosts() {
    const res = await fetch(
      `${apiURL}/api/posts?userid=${user._id}&returnLimit=0`,
      {
        mode: 'cors',
        headers: {
          Authorization: 'Bearer' + ' ' + token,
        },
      }
    );
    const data = await res.json();
    return data.posts;
  }
  // something wrong with this query
  const userAllPostsQuery = useQuery({
    queryKey: ['posts', { userid: user._id }],
    queryFn: countUserPosts,
  });

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
          Authorization: 'Bearer' + ' ' + token,
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
        Authorization: 'Bearer' + ' ' + token,
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
          Authorization: 'Bearer' + ' ' + token,
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
        Authorization: 'Bearer' + ' ' + token,
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
        <img className={style.avatarImg} src={`${apiURL}/${user.avatar.url}`} />
      </div>
      <div className={style.optionsColumn}>
        <div className={style.optionsWrapper}>
          <p className={style.userName}>{user.username}</p>
          {isCurrentUser ? (
            <div>
              <button
                onClick={() => {
                  openEditUser();
                }}
                className={style.editButton}
              >
                Edit Profile
              </button>
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
            <em className={style.stats}>
              {userAllPostsQuery.data ? userAllPostsQuery.data.length : 0}
            </em>{' '}
            posts
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
