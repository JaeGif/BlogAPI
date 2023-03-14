import React, { useState, useContext, useEffect } from 'react';
import {
  UserContext,
  ApiContext,
  ProfileContext,
  TokenContext,
} from '../../../App';
import UserSearchOverview from '../../userSearchOverview/UserSearchOverview';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import style from '../notificationsBar/notificationslayout.module.css';
import RecentSearch from './RecentSearch';
import uniqid from 'uniqid';

function SearchLayout({ handleOpen }) {
  const loggedInUser = useContext(UserContext);
  const apiURL = useContext(ApiContext);
  const getUserProfile = useContext(ProfileContext);
  const token = useContext(TokenContext);

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
    const res = await fetch(`${apiURL}/api/users?q=${query}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    setIsSearching(false);
    setSearchResults(data.users);
    console.log('data', data);
    if (data.users.length) {
      setSearchFound(true);
    } else {
      setSearchFound(false);
    }
  };
  const updateUser = async () => {
    const res = await fetch(`${apiURL}/api/users/${loggedInUser._id}`, {
      mode: 'cors',
      headers: { Authorization: 'Bearer' + ' ' + token },
    });
    const data = await res.json();
    setUserUpdated(data.user);
    setRecentSearchesIdx(data.user.recentSearches);
    resetAllConditionalFields();
  };
  const resetAllConditionalFields = () => {
    setIsSearching(false);
    setHasSearched(false);
    setSearchResults([]);
    setSearchFound(false);
  };
  const checkForRecents = async () => {
    let modifiedHistory = [];
    let history = await Promise.all(
      recentSearchesIdx.map(async (id) => {
        const res = await fetch(`${apiURL}/api/users/${id}`, {
          mode: 'cors',
          headers: { Authorization: 'Bearer' + ' ' + token },
        });
        if (res.status === 404) {
          return;
        }
        return res.json();
      })
    );
    for (let i = 0; i < history.length; i++) {
      if (typeof history[i] === 'object') {
        modifiedHistory.push(history[i]);
      }
    }
    console.log(userUpdated.recentSearches);
    setRecentSearches(modifiedHistory);

    console.log('history', modifiedHistory);
  };

  useEffect(() => {
    checkForRecents();
    console.log('check recents call');
  }, [recentSearchesIdx]);
  useEffect(() => {
    updateUser();
  }, []);
  console.log(searchFound);

  console.log('search results', searchResults);
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
            handleOpen={handleOpen}
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
                  handleOpen('');
                  e.stopPropagation();
                }}
              >
                <UserSearchOverview
                  key={uniqid()}
                  userData={result}
                  handleClick={handleRecentsUpdate}
                />
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
