import React, { useContext, useEffect, useState } from 'react';
import {
  ApiContext,
  ProfileContext,
  TokenContext,
  UserContext,
} from '../../../App';
import style from '../suggested.module.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LoadingIcon from '../../utlity_Components/LoadingIcon';

function SuggestedUserProfile({ user }) {
  const handleUserCheckout = useContext(ProfileContext);
  const apiURL = useContext(ApiContext);
  const token = useContext(TokenContext);
  const loggedInUser = useContext(UserContext);

  const [isFollowing, setIsFollowing] = useState(false);

  async function getUser() {
    const res = await fetch(`${apiURL}/api/users/${user.user}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    let message;
    switch (user.type) {
      case 'following/follows':
        message = 'friend of a friend ...';
        break;
      case 'user/follower':
        message = 'follows you ...';
        break;
      default:
        message = "this user's just cool";
        break;
    }
    data.message = message;
    return data;
  }

  const userQuery = useQuery({
    queryKey: ['users', user.user],
    queryFn: getUser,
  });

  const addFollowingToCurrentUser = async () => {
    // first add to logged in users list.
    setIsFollowing(true);

    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({ _id: user.user, type: 'following/add' })
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

    let data = new URLSearchParams();
    data.append(
      'follow',
      JSON.stringify({ _id: loggedInUser._id, type: 'follower/add' })
    );
    const followingRes = await fetch(`${apiURL}/api/users/${user.user}`, {
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
    setIsFollowing(true);
    addFollowerToUser();
    addFollowingToCurrentUser();
  };

  return (
    <div className={style.individualSuggestion}>
      {userQuery.isLoading ? (
        <></>
      ) : (
        userQuery.data.user && (
          <>
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleUserCheckout(userQuery.data.user._id);
              }}
              className={style.individualContainer}
            >
              <div className={style.userContainer}>
                <div className={style.suggestedUserAvatarContainer}>
                  <img
                    src={`${apiURL}/${userQuery.data.user.avatar}`}
                    alt='profile image'
                  ></img>
                </div>
                <div className={style.nameContainer}>
                  <p className={style.userName}>
                    {userQuery.data.user.username}
                  </p>
                  <p className={style.realName}>
                    {userQuery.data.user.firstName}{' '}
                    {userQuery.data.user.lastName}
                  </p>
                </div>
              </div>
              <div className={style.messageContainer}>
                <p>
                  <em>{userQuery.data.message}</em>
                </p>
              </div>
            </div>

            <p
              onClick={handleFollow}
              className={
                isFollowing
                  ? `${style.switchUserBtn} ${style.following}`
                  : `${style.switchUserBtn}`
              }
            >
              {isFollowing ? 'Following' : 'Follow'}
            </p>
          </>
        )
      )}
    </div>
  );
}

export default SuggestedUserProfile;
