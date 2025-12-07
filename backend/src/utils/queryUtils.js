const dayjs = require('dayjs');

// Search implementation - case-insensitive, across Customer Name and Phone Number
const applySearch = (data, query) => {
  if (!query.search) return data;
  
  const searchTerm = query.search.toLowerCase().trim();
  if (!searchTerm) return data;
  
  return data.filter(row => {
    const customerName = (row['Customer Name'] || '').toLowerCase();
    const phoneNumber = (row['Phone Number'] || '').toLowerCase();
    return customerName.includes(searchTerm) || phoneNumber.includes(searchTerm);
  });
};

// Filter implementation - multi-select and range-based
const applyFilters = (data, query) => {
  let result = data;
  
  // Customer Region filter (multi-select)
  if (query.customer_region) {
    const regions = query.customer_region.split(',').map(x => x.trim().toLowerCase());
    result = result.filter(row => 
      regions.includes((row['Customer Region'] || '').toLowerCase())
    );
  }
  
  // Gender filter (multi-select)
  if (query.gender) {
    const genders = query.gender.split(',').map(x => x.trim().toLowerCase());
    result = result.filter(row => 
      genders.includes((row['Gender'] || '').toLowerCase())
    );
  }
  
  // Age Range filter
  if (query.age_min || query.age_max) {
    const min = query.age_min ? Number(query.age_min) : -Infinity;
    const max = query.age_max ? Number(query.age_max) : Infinity;
    
    // Validate range
    if (!isNaN(min) && !isNaN(max) && min <= max) {
      result = result.filter(row => row.Age >= min && row.Age <= max);
    }
  }
  
  // Product Category filter (multi-select)
  if (query.product_category) {
    const categories = query.product_category.split(',').map(x => x.trim().toLowerCase());
    result = result.filter(row => 
      categories.includes((row['Product Category'] || '').toLowerCase())
    );
  }
  
  // Tags filter (multi-select, match any)
  if (query.tags) {
    const tags = query.tags.split(',').map(x => x.trim().toLowerCase());
    result = result.filter(row => {
      const rowTags = (row.Tags || []).map(t => t.toLowerCase());
      return tags.some(tag => rowTags.includes(tag));
    });
  }
  
  // Payment Method filter (multi-select)
  if (query.payment_method) {
    const methods = query.payment_method.split(',').map(x => x.trim().toLowerCase());
    result = result.filter(row => 
      methods.includes((row['Payment Method'] || '').toLowerCase())
    );
  }
  
  // Order Status filter
  if (query.order_status) {
    const status = query.order_status.toLowerCase();
    result = result.filter(row => 
      (row['Order Status'] || '').toLowerCase() === status
    );
  }
  
  // Date Range filter
  if (query.date_from || query.date_to) {
    const from = query.date_from ? dayjs(query.date_from).toDate() : new Date(-8640000000000000);
    const to = query.date_to ? dayjs(query.date_to).toDate() : new Date(8640000000000000);
    
    result = result.filter(row => row.DateObj >= from && row.DateObj <= to);
  }
  
  return result;
};

// Sorting implementation
const applySorting = (data, query) => {
  if (!query.sort_by) return data;
  
  const order = (query.sort_order || 'desc').toLowerCase();
  const result = [...data];
  
  result.sort((a, b) => {
    let comparison = 0;
    
    switch (query.sort_by) {
      case 'Date':
        comparison = a.DateObj - b.DateObj;
        break;
      case 'Quantity':
        comparison = a.Quantity - b.Quantity;
        break;
      case 'Customer Name':
        comparison = (a['Customer Name'] || '').localeCompare(b['Customer Name'] || '');
        break;
      default:
        return 0;
    }
    
    return order === 'asc' ? comparison : -comparison;
  });
  
  return result;
};

// Pagination implementation
const applyPagination = (data, query) => {
  const page = Math.max(1, Number(query.page || 1));
  const pageSize = Math.max(1, Number(query.page_size || 10));
  const total = data.length;
  
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const items = data.slice(start, end);
  
  return {
    total,
    page,
    page_size: pageSize,
    total_pages: Math.ceil(total / pageSize),
    items
  };
};

module.exports = {
  applySearch,
  applyFilters,
  applySorting,
  applyPagination
};
