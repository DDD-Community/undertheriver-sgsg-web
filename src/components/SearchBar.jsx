import React, { useState, useEffect, useRef } from 'react';

/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import SearchIcon from '../assets/img/icon-search.svg';

const SearchBarField = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3c3a37;
  font-size: 1rem;
  padding-top: 5rem;

  .search-input {
    margin-top: 2rem;
    width: 39.25rem;
    height: 3.5rem;
    background-image: url(${SearchIcon});
    background-position: 1.5rem 1rem;
    background-repeat: no-repeat;
    border-radius: 1.75rem;
    padding-left: 4.25rem;
    padding-right: 4.25rem;
  }

  .search-input::placeholder {
    color: #888888;
  }

  .search-input:focus {
    outline: none;
  }
`;

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef?.current.focus();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && searchInput !== '') {
      searchGoogle();
    }
  };

  const searchGoogle = () => {
    location.replace('http://www.google.co.kr/search?q=' + searchInput);
  };

  return (
    <section css={SearchBarField}>
      <input
        type="text"
        className="search-input"
        value={searchInput}
        ref={searchInputRef}
        placeholder="구글에서 검색"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
    </section>
  );
};

export default SearchBar;
