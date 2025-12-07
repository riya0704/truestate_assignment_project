Overview

A full-stack Retail Sales Management System built for TruEstate that demonstrates professional software engineering capabilities across both frontend and backend components. The system supports advanced search, filtering, sorting, and pagination functionalities based on structured sales data.

Tech Stack

Backend: Node.js, Express, MongoDB
Frontend: React, Vite
Database: MongoDB Atlas
Deployment: Vercel Serverless Functions

Search Implementation Summary

The search functionality implements full-text, case-insensitive search across Customer Name and Phone Number fields. The implementation is performant and accurate, working seamlessly alongside filters and sorting operations. Search queries are processed on the backend with proper query parameter handling and MongoDB text indexing for optimal performance.

Filter Implementation Summary

Multi-select and range-based filtering has been implemented for the following fields:
- Customer Region (multi-select dropdown)
- Gender (multi-select dropdown)
- Age Range (numeric range with min/max validation)
- Product Category (multi-select with comma-separated values)
- Tags (multi-select, matches any tag)
- Payment Method (multi-select dropdown)
- Date Range (from and to date pickers)

All filters work independently and in combination with each other. Filter state is maintained alongside search queries and sorting preferences, ensuring a consistent user experience across page navigation.

Sorting Implementation Summary

Three sorting options have been implemented:
- Date (Newest First) - displays transactions in descending chronological order
- Quantity - sorts by transaction quantity in ascending or descending order
- Customer Name (A-Z) - alphabetical sorting by customer name

Sorting operations preserve active search queries and applied filters. The sort state persists across pagination, maintaining user preferences throughout the browsing session.

Pagination Implementation Summary

Pagination is implemented with a default page size of 10 items per page. The system supports Next and Previous navigation with appropriate disabled states when reaching boundaries. The interface displays the current page number, total pages, and the range of items being viewed. All active search queries, filters, and sort preferences are retained when navigating between pages, ensuring data consistency and user experience continuity.

Setup Instructions

1. Install dependencies for both backend and frontend:
   cd backend
   npm install
   
   cd ../frontend
   npm install

2. Migrate CSV data to MongoDB (one-time setup):
   npm run migrate

3. Start the backend server:
   cd backend
   npm start
   
   The backend will run on http://localhost:4000

4. Start the frontend development server:
   cd frontend
   npm run dev
   
   The frontend will run on http://localhost:5173

5. Open your browser and navigate to http://localhost:5173


# truestate_assignment_project
