const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const transactionService = require('./services/transactionService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', transactionRoutes);

// Initialize data
const initializeServer = async () => {
  try {
    await transactionService.loadData();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`✓ TruEstate Backend Server running on port ${PORT}`);
      console.log(`✓ API available at http://localhost:${PORT}/api/transactions`);
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
};

initializeServer();
