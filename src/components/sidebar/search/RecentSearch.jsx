import React, { useContext } from 'react';
import uniqid from 'uniqid';
import { ProfileContext } from '../../../App';
import UserSearchOverview from '../../userSearchOverview/UserSearchOverview';
import LoadingIcon from '../../utlity_Components/LoadingIcon';

function RecentSearch({ recentSearches, recentSearchesIdx }) {
  const getUserProfile = useContext(ProfileContext);
  return (
    <div>
      <h3>Recent</h3>
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
