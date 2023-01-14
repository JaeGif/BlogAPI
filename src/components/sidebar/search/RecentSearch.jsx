import React from 'react';
import SearchResult from './SearchResult';
import uniqid from 'uniqid';

function RecentSearch({ recentSearches }) {
  return (
    <div>
      <h3>Recent</h3>
      {recentSearches.length ? (
        recentSearches.map((search) => <SearchResult key={uniqid()} />)
      ) : (
        <p>No recent searches</p>
      )}
    </div>
  );
}

export default RecentSearch;
