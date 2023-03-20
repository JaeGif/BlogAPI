import React, { useContext, useState, useEffect } from 'react';
import style from './userheader.module.css';
import { ApiContext, TokenContext, UserContext } from '../../../App';
import { useQuery } from '@tanstack/react-query';

function UserPublicHeader({ userData, openEditUser }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [followerCount, setFollowerCount] = useState(userData.followers.length);
  const [followsCount, setFollowsCount] = useState(userData.following.length);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const width = window.innerWidth;

  useEffect(() => {
    if (width <= 750) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const followerCountUI = () => {
    switch (followerCount) {
      case 1:
        return 'follower';
      default:
        return 'followers';
    }
  };

  useEffect(() => {
    if (userData._id === loggedInUser._id) {
      setIsCurrentUser(true);
    } else {
      setIsCurrentUser(false);
    }

    for (let i = 0; i < loggedInUser.following.length; i++) {
      if (loggedInUser.following[i] === userData._id) {
        setIsFollowing(true);
        break;
      }
    }
  });

  async function countUserPosts() {
    const res = await fetch(
      `${apiURL}/api/posts?userid=${userData._id}&returnLimit=0`,
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
    queryKey: ['posts', { userid: userData._id }],
    queryFn: countUserPosts,
  });

  const addFollowingToCurrentUser = async () => {
    // first add to logged in users list.
    setIsFollowing(true);

    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({ _id: userData._id, type: 'following/add' })
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
    if (followingRes.status === 200) {
      queryClient.invalidateQueries([
        'posts',
        { u: '641543591909c449071a2269' },
      ]);
    }
  };
  const addFollowerToUser = async () => {
    // add follower to this user

    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({
        _id: loggedInUser._id,
        type: 'follower/add',
        recipient: userData._id,
      })
    );
    const followingRes = await fetch(`${apiURL}/api/users/${userData._id}`, {
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
        _id: userData._id,
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
    if (followingRes.status === 200) {
      queryClient.invalidateQueries([
        'posts',
        { u: '641543591909c449071a2269' },
      ]);
    }
  };
  const removeFollowerFromUser = async () => {
    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({
        _id: userData._id,
        type: 'follower/remove',
      })
    );
    const followingRes = await fetch(`${apiURL}/api/users/${userData._id}`, {
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
    addFollowerToUser();
    addFollowingToCurrentUser();
  };

  const handleUnFollow = () => {
    removeFollowerFromUser();
    removeFollowingFromCurrentUser();
  };

  return (
    <>
      {isMobile ? (
        <div className={style.mobileContainer}>
          <div className={style.avatarStatsStruct}>
            <div className={style.profileAvatarWrapper}>
              <img
                className={style.avatarImg}
                src={`${apiURL}/${userData.avatar}`}
              />
            </div>
            <div className={style.userStatsContainer}>
              <p>
                <em className={style.stats}>
                  {userAllPostsQuery.data ? userAllPostsQuery.data.length : 0}
                </em>{' '}
                posts
              </p>
              <p>
                <em className={style.stats}>{followerCount}</em>{' '}
                {followerCountUI()}
              </p>
              <p>
                <em className={style.stats}>{followsCount}</em> following
              </p>
            </div>
          </div>
          <div className={style.userInfo}>
            <p className={style.realName}>
              {userData.firstName} {userData.lastName}
            </p>
            <p>{userData.bio}</p>
            <a href={`${userData.website}`} rel='noreferrer' target='_blank'>
              {userData.website}
            </a>
          </div>
          <div className={style.btnContainer}>
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
        </div>
      ) : (
        <div className={style.profileAvatarContainer}>
          <div className={style.profileAvatarWrapper}>
            <img
              className={style.avatarImg}
              src={`${apiURL}/${userData.avatar}`}
            />
          </div>
          <div className={style.optionsColumn}>
            <div className={style.optionsWrapper}>
              <p className={style.userName}>{userData.username}</p>
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
                      isFollowing
                        ? () => handleUnFollow()
                        : () => handleFollow()
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
            <div className={style.userInfoContainer}>
              <div className={style.userStatsContainer}>
                <p>
                  <em className={style.stats}>
                    {userAllPostsQuery.data ? userAllPostsQuery.data.length : 0}
                  </em>{' '}
                  posts
                </p>
                <p>
                  <em className={style.stats}>{followerCount}</em>{' '}
                  {followerCountUI()}
                </p>
                <p>
                  <em className={style.stats}>{followsCount}</em> following
                </p>
              </div>
              <div className={style.userInfo}>
                <p className={style.realName}>
                  {userData.firstName} {userData.lastName}
                </p>
                <p>{userData.bio}</p>
                <a
                  href={`${userData.website}`}
                  rel='noreferrer'
                  target='_blank'
                >
                  {userData.website}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserPublicHeader;
