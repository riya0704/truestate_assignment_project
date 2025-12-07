import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://riya:riya@cluster0.mgxhkjy.mongodb.net/?appName=Cluster0';
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
};

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, options);
  const db = client.db('truestate');

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('transactions');

    // Parse query parameters
    const {
      search,
      customer_region,
      gender,
      age_min,
      age_max,
      product_category,
      tags,
      payment_method,
      order_status,
      date_from,
      date_to,
      sort_by,
      sort_order,
      page = 1,
      page_size = 10,
    } = req.query;

    // Build MongoDB query
    const query = {};

    // Search
    if (search) {
      query.$or = [
        { 'Customer Name': { $regex: search, $options: 'i' } },
        { 'Phone Number': { $regex: search, $options: 'i' } },
      ];
    }

    // Filters
    if (customer_region) {
      const regions = customer_region.split(',').map(r => r.trim());
      query['Customer Region'] = { $in: regions };
    }

    if (gender) {
      const genders = gender.split(',').map(g => g.trim());
      query.Gender = { $in: genders };
    }

    if (age_min || age_max) {
      query.Age = {};
      if (age_min) query.Age.$gte = parseInt(age_min);
      if (age_max) query.Age.$lte = parseInt(age_max);
    }

    if (product_category) {
      const categories = product_category.split(',').map(c => c.trim());
      query['Product Category'] = { $in: categories };
    }

    if (tags) {
      const tagList = tags.split(',').map(t => t.trim());
      query.Tags = { $in: tagList };
    }

    if (payment_method) {
      const methods = payment_method.split(',').map(m => m.trim());
      query['Payment Method'] = { $in: methods };
    }

    if (order_status) {
      query['Order Status'] = order_status;
    }

    if (date_from || date_to) {
      query.Date = {};
      if (date_from) query.Date.$gte = date_from;
      if (date_to) query.Date.$lte = date_to;
    }

    // Sorting
    const sortOptions = {};
    if (sort_by) {
      const order = sort_order === 'asc' ? 1 : -1;
      if (sort_by === 'Date') {
        sortOptions.Date = order;
      } else if (sort_by === 'Quantity') {
        sortOptions.Quantity = order;
      } else if (sort_by === 'Customer Name') {
        sortOptions['Customer Name'] = order;
      }
    }

    // Pagination
    const pageNum = parseInt(page);
    const pageSizeNum = parseInt(page_size);
    const skip = (pageNum - 1) * pageSizeNum;

    // Execute query
    const [items, total] = await Promise.all([
      collection
        .find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSizeNum)
        .toArray(),
      collection.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / pageSizeNum);

    res.status(200).json({
      total,
      page: pageNum,
      page_size: pageSizeNum,
      total_pages: totalPages,
      items,
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
