Backend Architecture

The backend implements a layered MVC architecture with clear separation of concerns. The Express server connects to MongoDB Atlas for data persistence and exposes RESTful API endpoints for client consumption.

Controllers Layer
Located in src/controllers/, controllers handle incoming HTTP requests, validate parameters, and coordinate responses. The transactionController manages all transaction-related endpoints including search, filtering, and pagination operations.

Services Layer
Business logic resides in src/services/. The transactionService encapsulates data retrieval and processing logic, abstracting database operations from the controller layer.

Routes Layer
API routes are defined in src/routes/. The routing layer maps HTTP endpoints to their corresponding controller methods and applies any necessary middleware.

Utils Layer
Helper functions in src/utils/ provide reusable functionality:
- dataLoader: Handles CSV parsing and data normalization
- queryUtils: Implements filtering, sorting, and pagination logic

The server initializes by establishing a MongoDB connection and creating necessary indexes for optimal query performance.

Frontend Architecture

The frontend is a single-page React application built with Vite for fast development and optimized production builds.

Component Structure
All UI components are located in src/components/:

Sidebar
Navigation component with collapsible sections for different views. Manages active state and handles section switching.

SearchBar
Implements real-time search with debouncing. Supports Enter key submission and provides visual feedback during search operations.

FilterBar
Horizontal filter bar with dropdown selectors for quick filtering. Includes a refresh button for reloading data.

FilterPanel
Comprehensive filtering interface with multiple filter types:
- Dropdown selectors for categorical data
- Range inputs for numeric values
- Date pickers for temporal filtering

SummaryCards
Displays aggregated statistics calculated from the current dataset view.

SortingDropdown
Provides sorting options with visual indication of active sort criteria.

TransactionTable
Renders transaction data in a tabular format. Implements row hover effects and includes copy functionality for phone numbers.

Pagination
Manages page navigation with numbered page buttons. Maintains state across page changes.

State Management
The application uses React hooks for state management. The main App component maintains global state for search queries, filters, sort preferences, and pagination. State updates trigger API calls to fetch updated data.

Data Flow

1. User interacts with UI component (search, filter, sort, or paginate)
2. Component updates local state and notifies parent App component
3. App component constructs query parameters from current state
4. HTTP request sent to backend API with query parameters
5. Backend processes request:
   - Parses query parameters
   - Builds MongoDB query
   - Applies filters and sorting
   - Executes paginated query
   - Returns formatted response
6. Frontend receives response and updates component state
7. React re-renders affected components with new data

Folder Structure

root/
├── api/
│   ├── transactions.js
│   └── health.js
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── transactionController.js
│   │   ├── services/
│   │   │   └── transactionService.js
│   │   ├── routes/
│   │   │   └── transactionRoutes.js
│   │   ├── utils/
│   │   │   ├── dataLoader.js
│   │   │   └── queryUtils.js
│   │   └── index.js
│   ├── data/
│   │   └── sales.csv
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── SortingDropdown.jsx
│   │   │   ├── TransactionTable.jsx
│   │   │   └── Pagination.jsx
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── images/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── scripts/
│   └── migrate-csv-to-mongodb.js
├── docs/
│   └── architecture.md
├── vercel.json
├── package.json
└── README.md

Module Responsibilities

Backend Modules

Data Loading
Parses CSV files and transforms raw data into structured format. Handles type conversion and data validation during the loading process.

API Layer
Exposes RESTful endpoints following standard HTTP conventions. Implements proper status codes and error responses.

Query Processing
Applies search, filtering, sorting, and pagination operations. Optimizes queries using MongoDB indexes and efficient query patterns.

Error Handling
Catches and handles errors gracefully. Provides meaningful error messages for debugging while avoiding exposure of sensitive information.

Frontend Modules

UI Components
Modular, reusable components following React best practices. Each component has a single responsibility and manages its own local state when appropriate.

State Management
Centralized state management in the App component with prop drilling for child components. State updates are batched for optimal performance.

API Integration
Handles HTTP requests using the Fetch API. Implements loading states and error handling for all API calls.

User Experience
Provides visual feedback for all user actions. Implements responsive design for various screen sizes and devices.

Edge Case Handling

The system handles various edge cases to ensure robust operation:

No Search Results
When a search query returns no results, the interface displays a user-friendly message suggesting filter adjustments.

Conflicting Filters
If applied filters result in no matching records, an empty state is shown with appropriate messaging.

Invalid Numeric Ranges
Range inputs validate that minimum values do not exceed maximum values. Invalid ranges are either corrected automatically or rejected with user feedback.

Missing Optional Fields
The system gracefully handles records with missing optional data, displaying placeholder values or omitting fields as appropriate.

Large Filter Combinations
Multiple simultaneous filters are processed efficiently using MongoDB query optimization and proper indexing.

Empty Dataset
When no data is available, the interface displays an appropriate empty state rather than showing errors or blank screens.
