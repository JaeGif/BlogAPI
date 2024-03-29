import React, { useContext, useEffect, useMemo, useState } from 'react';
import style from './suggested.module.css';
import SuggestedUserProfile from './userProfile/SuggestedUserProfile';
import uniqid from 'uniqid';
import { ApiContext, UserContext, TokenContext } from '../../App';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingIcon from '../utlity_Components/LoadingIcon';

function Suggested({ handleLogOut }) {
  // Return a short list of suggested users ~5 users when this element is generated
  // Here is a dummy list with the users data;
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const numberOfSuggestedUsers = 5;
  const [hasLength, setHasLength] = useState(true);

  async function getSuggestions() {
    const res = await fetch(
      `${apiURL}/api/users/${loggedInUser._id}?s=${numberOfSuggestedUsers}`,
      {
        mode: 'cors',
        headers: {
          Authorization: 'Bearer' + ' ' + token,
        },
      }
    );
    const data = await res.json();
    if (data.suggested.length === 0) {
      setHasLength(false);
    }
    return data.suggested;
  }
  const suggestionsQuery = useQuery({
    queryKey: ['users', loggedInUser._id, { s: numberOfSuggestedUsers }],
    queryFn: getSuggestions,
  });

  return (
    <div>
      <div className={style.profileContainer}>
        <div className={style.userContainer}>
          <div className={style.avatarContainer}>
            <img
              src={`${apiURL}/${loggedInUser.avatar}`}
              alt='profile avatar'
            ></img>
          </div>
          <div className={style.nameContainer}>
            <p className={style.userName}>{loggedInUser.username}</p>
            <p className={style.realName}>
              {loggedInUser.firstName} {loggedInUser.lastName}
            </p>
          </div>
        </div>
        <p onClick={() => handleLogOut()} className={style.switchUserBtn}>
          Switch
        </p>
      </div>
      {suggestionsQuery.isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <span className={style.profileContainer}>
            <p>Suggestions For You</p>
          </span>
          <div className={style.suggestedUsersContainer}>
            {suggestionsQuery.data.map((user) => (
              <SuggestedUserProfile key={uniqid()} user={user} />
            ))}
          </div>
        </>
      )}
      {suggestionsQuery.isFetched && !hasLength && (
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
