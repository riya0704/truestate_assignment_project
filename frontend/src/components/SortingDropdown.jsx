import React from 'react';

const SortingDropdown = ({ sortBy, onSortChange }) => {
  return (
    <div className="sorting-dropdown">
      <span className="sort-icon">⇅</span>
      <label>Sort by:</label>
      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value="">Default</option>
        <option value="Date">Date (Newest First)</option>
        <option value="Quantity">Quantity</option>
        <option value="Customer Name">Customer Name (A-Z)</option>
      </select>
    </div>
  );
};

export default SortingDropdown;
