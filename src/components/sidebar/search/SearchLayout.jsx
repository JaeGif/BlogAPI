import React, { useState, useContext, useEffect } from 'react';
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
  const [recentSearchesIdx, setRecentSearchesIdx] = useState(
    loggedInUser.recentSearches
  );
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userUpdated, setUserUpdated] = useState(loggedInUser);

  const handleRecentsUpdate = () => {
    updateUser();
    setHasSearched(false);
    setIsSearching(false);
    console.log('toggled update');
  };
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
  const updateUser = async () => {
    const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
      mode: 'cors',
    });
    const data = await res.json();
    setUserUpdated(data.user);
    setRecentSearchesIdx(data.user.recentSearches);
  };
  const checkForRecents = async () => {
    const history = await Promise.all(
      recentSearchesIdx.map(async (id) => {
        const res = await fetch(`${apiURL}/api/users/${id}`);
        return res.json();
      })
    );
    console.log(userUpdated.recentSearches);
    setRecentSearches(history);
    console.log('send check', history);
  };

  useEffect(() => {
    checkForRecents();
    console.log('check recents call');
  }, [recentSearchesIdx]);

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
          <RecentSearch
            key={uniqid()}
            recentSearches={recentSearches}
            recentSearchesIdx={recentSearchesIdx}
            updatedRecents={handleRecentsUpdate}
          />
        )}

        {searchFound ? (
          searchResults.length ? (
            searchResults.map((result) => (
              <div
                onClick={(e) => {
                  getUserProfile(result._id);
                  handleRecentsUpdate();
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
      </div>
    </div>
  );
}

export default SearchLayout;
