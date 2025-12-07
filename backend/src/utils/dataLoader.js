const fs = require('fs');
const csv = require('csv-parser');
const dayjs = require('dayjs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', '..', 'data', 'sales.csv');

const loadCSV = () => {
  return new Promise((resolve, reject) => {
    const transactions = [];
    
    fs.createReadStream(DATA_PATH)
      .pipe(csv())
      .on('data', (row) => {
        // Normalize numeric fields
        row.Quantity = Number(row.Quantity || 0);
        row['Price per Unit'] = Number(row['Price per Unit'] || 0);
        row['Discount Percentage'] = Number(row['Discount Percentage'] || 0);
        row['Total Amount'] = Number(row['Total Amount'] || 0);
        row['Final Amount'] = Number(row['Final Amount'] || 0);
        row.Age = Number(row.Age || 0);
        
        // Parse date
        row.DateObj = dayjs(row.Date, ['M/D/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD']).toDate();
        
        // Normalize tags to array
        row.Tags = (row.Tags || '').split(',').map(t => t.trim()).filter(Boolean);
        
        transactions.push(row);
      })
      .on('end', () => {
        console.log(`✓ Loaded ${transactions.length} transactions from CSV`);
        resolve(transactions);
      })
      .on('error', (error) => {
        console.error('Error loading CSV:', error);
        reject(error);
      });
  });
};

module.exports = { loadCSV };
