import React, { useState, useContext } from 'react';
import { UserContext, ApiContext } from '../../../App';
import LoadingIcon from '../../utlity_Components/LoadingIcon';
import style from '../notificationsBar/notificationslayout.module.css';
import RecentSearch from './RecentSearch';
import SearchResult from './SearchResult';

function SearchLayout() {
  const loggedInUser = useContext(UserContext);
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFound, setSearchFound] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleTypingInput = () => {
    setIsTyping(true);
  };

  const searchForUsers = async () => {};

  return (
    <div className={style.notificationsWrapper}>
      <div className={style.searchBoxContainer}>
        <div className={`${style.notifsHeader}`}>
          <h1>Search</h1>
          <span className={style.searchContainer}>
            <input
              onClick={handleTypingInput}
              on
              className={style.searchInput}
              placeholder='Search'
              type='text'
              alt='Search bar'
            />
          </span>
        </div>
      </div>
      <div className={style.notifsHeader}>
        {isSearching ? (
          <LoadingIcon />
        ) : (
          <RecentSearch recentSearches={recentSearches} />
        )}
        {searchFound ? (
          searchResults.length ? (
            searchResults.map((result) => <SearchResult />)
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
