import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import SummaryCards from './components/SummaryCards';
import TransactionTable from './components/TransactionTable';
import Pagination from './components/Pagination';

// Use old backend for local development, Vercel API in production
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:4000/api';

export default function App() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('active');
  
  const PAGE_SIZE = 10;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      
      if (search) params.set('search', search);
      
      // Add status filter based on active section
      const statusFilters = {
        'pre-active': 'Pending',
        'active': 'Completed',
        'blocked': 'Cancelled',
        'closed': 'Closed'
      };
      
      if (statusFilters[activeSection]) {
        params.set('order_status', statusFilters[activeSection]);
      }
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });
      
      if (sortBy) {
        params.set('sort_by', sortBy);
        params.set('sort_order', sortBy === 'Date' ? 'desc' : 'asc');
      }
      
      params.set('page', page);
      params.set('page_size', PAGE_SIZE);

      const response = await fetch(`${API_BASE_URL}/transactions?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      
      const data = await response.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, activeSection]);

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
    setPage(1);
    setTimeout(fetchData, 0);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setTimeout(fetchData, 0);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setPage(1);
    setTimeout(fetchData, 0);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setPage(1);
  };

  // Calculate summary data
  const totalUnits = items.reduce((sum, item) => sum + (item.Quantity || 0), 0);
  const totalAmount = items.reduce((sum, item) => sum + (item['Final Amount'] || 0), 0);
  const totalDiscount = items.reduce((sum, item) => sum + ((item['Total Amount'] || 0) - (item['Final Amount'] || 0)), 0);

  // Get section title
  const getSectionTitle = () => {
    const titles = {
      'dashboard': 'Dashboard',
      'nexus': 'Nexus',
      'intake': 'Intake',
      'pre-active': 'Pre-active Services',
      'active': 'Active Services',
      'blocked': 'Blocked Services',
      'closed': 'Closed Services',
      'proforma': 'Proforma Invoices',
      'final': 'Final Invoices'
    };
    return titles[activeSection] || 'Sales Management System';
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="app-container">
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <Sidebar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isMobileOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      <div className="main-content">
        <div className="content-header">
          <h1>{getSectionTitle()}</h1>
          <SearchBar value={search} onSearch={handleSearch} />
        </div>

        <FilterBar 
          filters={filters} 
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          onRefresh={fetchData}
        />

        <SummaryCards 
          totalUnits={totalUnits}
          totalAmount={totalAmount}
          totalDiscount={totalDiscount}
          itemCount={items.length}
        />

        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading transactions...</p>
          </div>
        )}
        
        {error && (
          <div className="error-state">
            <p>Error: {error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <>
            <TransactionTable items={items} />
            {items.length > 0 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
