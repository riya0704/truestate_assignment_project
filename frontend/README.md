TruEstate Frontend

The frontend application for TruEstate Retail Sales Management System. Built with React and Vite, it provides a modern, responsive interface for managing and viewing sales transactions.

Technology Stack

- React 18
- Vite 5
- Pure CSS for styling
- Fetch API for HTTP requests

Setup

1. Navigate to the frontend directory:
   cd frontend

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

The application will be available at http://localhost:5173

Build for Production

To create a production build:

npm run build

The optimized build will be created in the dist/ directory.

To preview the production build locally:

npm run preview

Project Structure

frontend/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── FilterBar.jsx
│   │   ├── SortingDropdown.jsx
│   │   ├── TransactionTable.jsx
│   │   ├── Pagination.jsx
│   │   ├── SummaryCards.jsx
│   │   └── Sidebar.jsx
│   ├── styles/
│   │   └── App.css
│   ├── App.jsx
│   └── main.jsx
├── images/
├── index.html
├── package.json
└── README.md

Component Overview

App.jsx
Main application component that manages global state and coordinates data fetching.

Sidebar.jsx
Navigation sidebar with collapsible sections for different views and services.

SearchBar.jsx
Search input component with real-time search capability for customer names and phone numbers.

FilterBar.jsx
Horizontal filter bar with dropdown selectors for various filter criteria and a refresh button.

FilterPanel.jsx
Comprehensive filter panel with multiple filter options including region, gender, age range, product category, tags, payment method, and date range.

SummaryCards.jsx
Displays summary statistics including total units sold, total amount, and total discount.

SortingDropdown.jsx
Dropdown component for selecting sort criteria and order.

TransactionTable.jsx
Data table component displaying transaction records with copy functionality for phone numbers.

Pagination.jsx
Pagination controls with page numbers and navigation buttons.

Features

Search
Full-text search across customer names and phone numbers with case-insensitive matching.

Filtering
Multi-select and range-based filters for comprehensive data filtering:
- Customer Region
- Gender
- Age Range
- Product Category
- Tags
- Payment Method
- Date Range

Sorting
Sort transactions by:
- Date (Newest First)
- Quantity
- Customer Name (A-Z)

Pagination
Navigate through large datasets with 10 items per page. Pagination maintains all active filters, search queries, and sort preferences.

Responsive Design
The application is fully responsive and works across:
- Desktop computers
- Tablets
- Mobile devices (portrait and landscape)

The sidebar collapses to a hamburger menu on mobile devices, and the table becomes horizontally scrollable to accommodate all columns.

State Management
State is managed using React hooks (useState, useEffect) with proper dependency tracking to ensure efficient re-renders and data consistency.

API Integration
The frontend communicates with the backend through RESTful API calls. In development mode, it connects to http://localhost:4000/api. In production, it uses relative paths to the same domain.

Styling
Custom CSS is used throughout the application with:
- Consistent color scheme
- Smooth transitions and animations
- Hover effects for interactive elements
- Responsive breakpoints for different screen sizes
- Touch-friendly interface elements

