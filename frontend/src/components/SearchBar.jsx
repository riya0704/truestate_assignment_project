import React, { useState } from 'react';

const SearchBar = ({ value, onSearch }) => {
  const [searchValue, setSearchValue] = useState(value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    // Real-time search
    if (newValue.length === 0 || newValue.length >= 3) {
      onSearch(newValue);
    }
  };

  return (
    <div className="search-bar-new">
      <img src="/images/search-normal.png" alt="Search" className="search-icon-img" />
      <input
        type="text"
        placeholder="Name, Phone no."
        value={searchValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="search-input-new"
      />
    </div>
  );
};

export default SearchBar;
