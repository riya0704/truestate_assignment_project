TruEstate Backend

This is the backend service for the TruEstate Retail Sales Management System. It provides RESTful API endpoints for transaction data management with support for search, filtering, sorting, and pagination operations.

Technology Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- CSV Parser for data migration
- CORS for cross-origin requests

Setup

1. Navigate to the backend directory:
   cd backend

2. Install dependencies:
   npm install

3. Ensure MongoDB connection string is configured

4. Start the server:
   npm start

The server will start on port 4000 by default.

API Endpoints

GET /api/transactions
Retrieves paginated transaction data with optional filtering, sorting, and search.

Query Parameters:
- search: Search term for customer name or phone number
- customer_region: Filter by customer region
- gender: Filter by gender
- age_min: Minimum age filter
- age_max: Maximum age filter
- product_category: Filter by product category
- tags: Filter by tags
- payment_method: Filter by payment method
- order_status: Filter by order status
- date_from: Start date for date range filter
- date_to: End date for date range filter
- sort_by: Field to sort by (Date, Quantity, Customer Name)
- sort_order: Sort order (asc or desc)
- page: Page number (default: 1)
- page_size: Items per page (default: 10)

Response:
{
  "total": 150,
  "page": 1,
  "page_size": 10,
  "total_pages": 15,
  "items": [...]
}

GET /api/health
Health check endpoint to verify server status.

Response:
{
  "ok": true,
  "count": 150
}

Project Structure

backend/
├── src/
│   ├── controllers/
│   │   └── transactionController.js
│   ├── services/
│   │   └── transactionService.js
│   ├── routes/
│   │   └── transactionRoutes.js
│   ├── utils/
│   │   ├── dataLoader.js
│   │   └── queryUtils.js
│   └── index.js
├── data/
│   └── sales.csv
├── package.json
└── README.md

Architecture

The backend follows MVC architecture with clear separation of concerns:

Controllers: Handle HTTP requests and responses
Services: Contain business logic for data processing
Routes: Define API endpoint mappings
Utils: Provide helper functions for data loading and query processing

Data Flow

1. Client sends HTTP request to API endpoint
2. Route handler directs request to appropriate controller
3. Controller validates request and calls service layer
4. Service applies business logic (filtering, sorting, pagination)
5. Data is retrieved from MongoDB
6. Response is formatted and sent back to client

Error Handling

The backend implements comprehensive error handling:
- Invalid query parameters are validated
- Database connection errors are caught and logged
- Malformed requests return appropriate HTTP status codes
- All errors include descriptive messages for debugging

Performance Considerations

- MongoDB indexes are created on frequently queried fields
- Connection pooling is used for database connections
- Query results are paginated to limit response size
- Efficient filtering logic minimizes database load
