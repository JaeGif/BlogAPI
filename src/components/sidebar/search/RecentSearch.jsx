import React, { useContext } from 'react';
import uniqid from 'uniqid';
import {
  ApiContext,
  PathContext,
  ProfileContext,
  TokenContext,
  UserContext,
} from '../../../App';
import UserSearchOverview from '../../userSearchOverview/UserSearchOverview';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import style from './recentsearch.module.css';

function RecentSearch({
  recentSearches,
  recentSearchesIdx,
  updatedRecents,
  handleOpen,
}) {
  const getUserProfile = useContext(ProfileContext);
  const apiURL = useContext(ApiContext);
  const loggedInUser = useContext(UserContext);
  const token = useContext(TokenContext);
  const baseURL = useContext(PathContext);

  const clearLoggedInUserHistory = async (notificationIdx) => {
    let notificationId = '';
    if (notificationIdx.length) {
      for (let i = 0; i < notificationIdx.length; i++) {
        let data = new URLSearchParams();
        notificationId = notificationIdx[i].toString();

        data.append('removeRecent', notificationId);
        const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
          method: 'PUT',
          body: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Bearer' + ' ' + token,
          },
          mode: 'cors',
        });
      }
    }
    updatedRecents();
  };

  return (
    <div>
      <span className={style.headingContainer}>
        <h3>Recent</h3>
        {recentSearches.length ? (
          <p
            onClick={() => {
              clearLoggedInUserHistory(recentSearchesIdx);
            }}
            className={style.clearSearchHistory}
          >
            Clear all
          </p>
        ) : (
          <></>
        )}
      </span>
      {recentSearches.length ? (
        recentSearches.map((user) => (
          <span
            key={uniqid()}
            className={style.searchContainer}
            onClick={(e) => {
              getUserProfile(user.user._id);
              handleOpen('');
              e.stopPropagation();
            }}
          >
            <UserSearchOverview key={uniqid()} userData={user.user} />
            <img
              onClick={(e) => {
                e.stopPropagation();
                clearLoggedInUserHistory([user.user._id]);
              }}
              className={style.removeResult}
              src={`${baseURL}/assets/favicons/close-grey.svg`}
            />
          </span>
        ))
      ) : recentSearchesIdx.length ? (
        <LoadingIcon />
      ) : (
        <p>No recent searches.</p>
      )}
    </div>
  );
}

export default RecentSearch;
