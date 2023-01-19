import React, { useContext, useEffect, useState } from 'react';
import style from './suggested.module.css';
import SuggestedUserProfile from './userProfile/SuggestedUserProfile';
import uniqid from 'uniqid';
import { ApiContext, UserContext } from '../../App';

function Suggested() {
  // Return a short list of suggested users ~5 users when this element is generated
  // Here is a dummy list with the users data;
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  useEffect(() => {
    async function getSuggestions() {
      const numberOfSuggestedUsers = 5;
      const res = await fetch(
        `${apiURL}/api/users/${loggedInUser._id}?s=${numberOfSuggestedUsers}`,
        {
          mode: 'cors',
        }
      );
      const data = await res.json();
      setSuggestedUsers(data.suggested);
      console.log(data.suggested);
    }
    getSuggestions();
  }, []);

  return (
    <div>
      <div className={style.profileContainer}>
        <div className={style.userContainer}>
          <div className={style.avatarContainer}>
            <img src={loggedInUser.avatar.url} alt='profile avatar'></img>
          </div>
          <div className={style.nameContainer}>
            <p className={style.userName}>{loggedInUser.userName}</p>
            <p className={style.realName}>
              {loggedInUser.firstName} {loggedInUser.lastName}
            </p>
          </div>
        </div>
        <p className={style.switchUserBtn}>Switch</p>
      </div>
      {suggestedUsers.length ? (
        <>
          <span className={style.profileContainer}>
            <p>Suggestions For You</p>
          </span>
          <div className={style.suggestedUsersContainer}>
            {suggestedUsers.map((user) => (
              <SuggestedUserProfile key={uniqid()} user={user} />
            ))}
          </div>
        </>
      ) : (
        <div className={style.moreSuggestionsContainer}>
          <p>
            <em>Check later for more suggestions.</em>
          </p>
        </div>
      )}
    </div>
  );
}

export default Suggested;
