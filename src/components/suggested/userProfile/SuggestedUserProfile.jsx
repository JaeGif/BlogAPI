import React, { useContext, useEffect, useState } from 'react';
import { ApiContext, ProfileContext, UserContext } from '../../../App';
import style from '../suggested.module.css';

function SuggestedUserProfile({ user }) {
  const handleUserCheckout = useContext(ProfileContext);
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [dataFound, setDataFound] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [message, setMessage] = useState('');
  console.log(user.type);

  useEffect(() => {
    console.log('fethcing');
    async function getUser() {
      const res = await fetch(`${apiURL}/api/users/${user.user}`, {
        mode: 'cors',
      });
      const data = await res.json();
      setUserData(data.user);
      setDataFound(true);

      switch (user.type) {
        case 'following/follows':
          setMessage('friend of a friend ...');
          break;
        case 'user/follower':
          setMessage('follows you ...');
          break;
        default:
          setMessage("this user's just cool");
          break;
      }
    }
    getUser();
  }, []);

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
      {dataFound ? (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleUserCheckout(userData._id);
            }}
            className={style.individualContainer}
          >
            <div className={style.userContainer}>
              <div className={style.suggestedUserAvatarContainer}>
                <img src={userData.avatar.url} alt='profile image'></img>
              </div>
              <div className={style.nameContainer}>
                <p className={style.userName}>{userData.userName}</p>
                <p className={style.realName}>
                  {userData.firstName} {userData.lastName}
                </p>
              </div>
            </div>
            <p>
              <em>{message}</em>
            </p>
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
      ) : (
        <></>
      )}
    </div>
  );
}

export default SuggestedUserProfile;
