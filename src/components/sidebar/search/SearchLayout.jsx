import React, { useState, useContext } from 'react';
import { UserContext, ApiContext, ProfileContext } from '../../../App';
import UserSearchOverview from '../../userSearchOverview/UserSearchOverview';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import style from '../notificationsBar/notificationslayout.module.css';
import RecentSearch from './RecentSearch';
import uniqid from 'uniqid';

function SearchLayout() {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const getUserProfile = useContext(ProfileContext);

  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFound, setSearchFound] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const searchForUsers = async (e) => {
    setIsSearching(true);
    setHasSearched(true);

    let query = e.target.value;
    if (query === '') {
      setIsSearching(false);
      setHasSearched(false);
      setSearchResults([]);
      setSearchFound(false);
      return;
    }
    const res = await fetch(`${apiURL}/api/users?q=${query}`, { mode: 'cors' });
    const data = await res.json();
    setIsSearching(false);
    setSearchResults(data.users);
    if (data.users.length) {
      setSearchFound(true);
    } else {
      setSearchFound(false);
    }
  };
  const emptyFunction = (user) => {
    return;
  };
  return (
    <div className={style.notificationsWrapper}>
      <div className={style.searchBoxContainer}>
        <div className={`${style.notifsHeader}`}>
          <h1>Search</h1>
          <span className={style.searchContainer}>
            <input
              onChange={(e) => searchForUsers(e)}
              className={style.searchInput}
              placeholder='Search'
              type='text'
              alt='Search bar'
            />
          </span>
        </div>
      </div>
      <div className={style.notifsHeader}>
        {hasSearched ? (
          isSearching ? (
            <LoadingIcon />
          ) : (
            <></>
          )
        ) : isSearching ? (
          <LoadingIcon />
        ) : (
          <RecentSearch recentSearches={recentSearches} />
        )}
        {/*         {isSearching ? (
          <LoadingIcon />
        ) : (
          <RecentSearch recentSearches={recentSearches} />
        )} */}
        {searchFound ? (
          searchResults.length ? (
            searchResults.map((result) => (
              <div
                onClick={(e) => {
                  getUserProfile(result._id);
                  e.stopPropagation();
                }}
              >
                <UserSearchOverview key={uniqid()} user={result} />
              </div>
            ))
          ) : (
            <p>No results.</p>
          )
        ) : (
          <></>
        )}
        {/* Here will show users recent search history, limited to last 10searches only */}
      </div>
      {/*   <div className={style.notificationsMinorWrapper}>
    {recentNotifications.length ? (
      recentNotifications.map((notification) => (
        <Notification key={uniqid()} notification={notification} />
      ))
    ) : (
      <p>No new notifications.</p>
    )}
  </div> */}
    </div>
  );
}

export default SearchLayout;
