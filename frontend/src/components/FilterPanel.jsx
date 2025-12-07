import React from 'react';

const FilterPanel = ({ filters, setFilters, onApply, onClear }) => {
  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <span className="filter-icon">🔍</span>
        <h3>Filters</h3>
      </div>

      <div className="filter-grid">
        <div className="filter-group">
          <label>Customer Region</label>
          <select
            value={filters.customer_region || ''}
            onChange={(e) => handleChange('customer_region', e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="Central">Central</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Gender</label>
          <select
            value={filters.gender || ''}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Age Range</label>
          <div className="range-inputs">
            <input
              type="number"
              placeholder="Min"
              value={filters.age_min || ''}
              onChange={(e) => handleChange('age_min', e.target.value)}
              className="range-input"
            />
            <span className="range-separator">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.age_max || ''}
              onChange={(e) => handleChange('age_max', e.target.value)}
              className="range-input"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Product Category</label>
          <input
            type="text"
            placeholder="e.g., Electronics, Clothing"
            value={filters.product_category || ''}
            onChange={(e) => handleChange('product_category', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Tags</label>
          <input
            type="text"
            placeholder="Comma-separated tags"
            value={filters.tags || ''}
            onChange={(e) => handleChange('tags', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Payment Method</label>
          <input
            type="text"
            placeholder="e.g., Credit Card, Cash"
            value={filters.payment_method || ''}
            onChange={(e) => handleChange('payment_method', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Date From</label>
          <input
            type="date"
            value={filters.date_from || ''}
            onChange={(e) => handleChange('date_from', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Date To</label>
          <input
            type="date"
            value={filters.date_to || ''}
            onChange={(e) => handleChange('date_to', e.target.value)}
          />
        </div>
      </div>

      <div className="filter-actions">
        <button onClick={onClear} className="clear-button">
          ✕ Clear All
        </button>
        <button onClick={onApply} className="apply-button">
          ✓ Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
