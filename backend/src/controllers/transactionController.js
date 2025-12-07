const transactionService = require('../services/transactionService');

exports.getTransactions = async (req, res) => {
  try {
    const result = await transactionService.getTransactions(req.query);
    res.json(result);
  } catch (error) {
    console.error('Error in getTransactions:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

exports.getHealth = (req, res) => {
  const count = transactionService.getTransactionCount();
  res.json({ ok: true, count });
};
