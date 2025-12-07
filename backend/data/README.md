Sales Data

This directory should contain the sales.csv file for local development.

Note: The CSV file is not included in the repository due to its large size (223 MB).

For Production Deployment

The data has been migrated to MongoDB Atlas. Run the migration script to populate the database:

npm run migrate

For Local Development

If you need the CSV file for local development:

1. Download the sales data from the provided source
2. Place the sales.csv file in this directory (backend/data/)
3. Start the backend server: npm start

The CSV file is automatically ignored by git and will not be committed to the repository.

Data Structure

The sales.csv file should contain the following columns:
- Transaction ID
- Date
- Customer ID
- Customer Name
- Phone Number
- Gender
- Age
- Customer Region
- Customer Type
- Product ID
- Product Name
- Brand
- Product Category
- Tags
- Quantity
- Price per Unit
- Discount Percentage
- Total Amount
- Final Amount
- Payment Method
- Order Status
- Delivery Type
- Store ID
- Store Location
- Salesperson ID
- Employee Name
