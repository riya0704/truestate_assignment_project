const { MongoClient } = require('mongodb');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const uri = 'mongodb+srv://riya:riya@cluster0.mgxhkjy.mongodb.net/?appName=Cluster0';
const CSV_PATH = path.join(__dirname, '..', 'backend', 'data', 'sales.csv');

async function migrateCsvToMongoDB() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB Atlas');

    const db = client.db('truestate');
    const collection = db.collection('transactions');

    // Clear existing data
    await collection.deleteMany({});
    console.log('✓ Cleared existing data');

    // Read and parse CSV
    const transactions = [];
    
    await new Promise((resolve, reject) => {
      fs.createReadStream(CSV_PATH)
        .pipe(csv())
        .on('data', (row) => {
          // Normalize data types
          const transaction = {
            'Transaction ID': row['Transaction ID'],
            'Date': row['Date'],
            'Customer ID': row['Customer ID'],
            'Customer Name': row['Customer Name'],
            'Phone Number': row['Phone Number'],
            'Gender': row['Gender'],
            'Age': parseInt(row['Age']) || 0,
            'Customer Region': row['Customer Region'],
            'Customer Type': row['Customer Type'],
            'Product ID': row['Product ID'],
            'Product Name': row['Product Name'],
            'Brand': row['Brand'],
            'Product Category': row['Product Category'],
            'Tags': (row['Tags'] || '').split(',').map(t => t.trim()).filter(Boolean),
            'Quantity': parseInt(row['Quantity']) || 0,
            'Price per Unit': parseFloat(row['Price per Unit']) || 0,
            'Discount Percentage': parseFloat(row['Discount Percentage']) || 0,
            'Total Amount': parseFloat(row['Total Amount']) || 0,
            'Final Amount': parseFloat(row['Final Amount']) || 0,
            'Payment Method': row['Payment Method'],
            'Order Status': row['Order Status'],
            'Delivery Type': row['Delivery Type'],
            'Store ID': row['Store ID'],
            'Store Location': row['Store Location'],
            'Salesperson ID': row['Salesperson ID'],
            'Employee Name': row['Employee Name'],
          };
          transactions.push(transaction);
        })
        .on('end', resolve)
        .on('error', reject);
    });

    console.log(`✓ Parsed ${transactions.length} transactions from CSV`);

    // Insert into MongoDB
    if (transactions.length > 0) {
      const result = await collection.insertMany(transactions);
      console.log(`✓ Inserted ${result.insertedCount} documents into MongoDB`);
    }

    // Create indexes for better query performance
    await collection.createIndex({ 'Customer Name': 'text', 'Phone Number': 'text' });
    await collection.createIndex({ 'Customer Region': 1 });
    await collection.createIndex({ 'Gender': 1 });
    await collection.createIndex({ 'Age': 1 });
    await collection.createIndex({ 'Product Category': 1 });
    await collection.createIndex({ 'Order Status': 1 });
    await collection.createIndex({ 'Date': 1 });
    console.log('✓ Created indexes');

    console.log('\n✅ Migration completed successfully!');
    console.log(`Total documents in collection: ${await collection.countDocuments()}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

migrateCsvToMongoDB();
