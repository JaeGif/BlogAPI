import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { ProfileContext } from '../../../App';
import UserSearchOverview from '../../userSearchOverview/UserSearchOverview';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import style from './recentsearch.module.css';

function RecentSearch({ recentSearches, recentSearchesIdx }) {
  const getUserProfile = useContext(ProfileContext);
  return (
    <div>
      <span className={style.headingContainer}>
        <h3>Recent</h3>
        {recentSearches.length ? (
          <p className={style.clearSearchHistory}>Clear all</p>
        ) : (
          <></>
        )}
      </span>
      {recentSearches.length ? (
        recentSearches.map((user) => (
          <div
            onClick={(e) => {
              getUserProfile(user.user._id);
              e.stopPropagation();
            }}
          >
            <UserSearchOverview key={uniqid()} user={user.user} />
          </div>
        ))
      ) : recentSearchesIdx ? (
        <LoadingIcon />
      ) : (
        <p>No recent searches.</p>
      )}
    </div>
  );
}

export default RecentSearch;
