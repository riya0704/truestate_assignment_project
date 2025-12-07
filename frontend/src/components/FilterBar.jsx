import React, { useState } from 'react';

const FilterBar = ({ filters, onFilterChange, sortBy, onSortChange, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="filter-bar-new">
      <img 
        src="/images/rotate-left.png" 
        alt="Refresh" 
        className={`filter-icon-img ${isRefreshing ? 'refreshing' : ''}`}
        onClick={handleRefresh}
        title="Refresh data"
      />
      
      <select 
        value={filters.customer_region || ''} 
        onChange={(e) => handleFilterChange('customer_region', e.target.value)}
        className="filter-select"
      >
        <option value="">Customer Region</option>
        <option value="East">East</option>
        <option value="West">West</option>
        <option value="North">North</option>
        <option value="South">South</option>
        <option value="Central">Central</option>
      </select>

      <select 
        value={filters.gender || ''} 
        onChange={(e) => handleFilterChange('gender', e.target.value)}
        className="filter-select"
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select 
        value={filters.age_range || ''} 
        onChange={(e) => handleFilterChange('age_range', e.target.value)}
        className="filter-select"
      >
        <option value="">Age Range</option>
        <option value="18-25">18-25</option>
        <option value="26-35">26-35</option>
        <option value="36-45">36-45</option>
        <option value="46+">46+</option>
      </select>

      <select 
        value={filters.product_category || ''} 
        onChange={(e) => handleFilterChange('product_category', e.target.value)}
        className="filter-select"
      >
        <option value="">Product Category</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Home">Home</option>
      </select>

      <select 
        value={filters.tags || ''} 
        onChange={(e) => handleFilterChange('tags', e.target.value)}
        className="filter-select"
      >
        <option value="">Tags</option>
        <option value="New">New</option>
        <option value="Sale">Sale</option>
        <option value="Featured">Featured</option>
      </select>

      <select 
        value={filters.payment_method || ''} 
        onChange={(e) => handleFilterChange('payment_method', e.target.value)}
        className="filter-select"
      >
        <option value="">Payment Method</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
      </select>

      <select 
        value={filters.date || ''} 
        onChange={(e) => handleFilterChange('date', e.target.value)}
        className="filter-select"
      >
        <option value="">Date</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>

      <select 
        value={sortBy} 
        onChange={(e) => onSortChange(e.target.value)}
        className="filter-select sort-select"
      >
        <option value="">Sort by: Customer Name (A-Z)</option>
        <option value="Date">Date (Newest First)</option>
        <option value="Quantity">Quantity</option>
        <option value="Customer Name">Customer Name (A-Z)</option>
      </select>
    </div>
  );
};

export default FilterBar;
