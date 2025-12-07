const dataLoader = require('../utils/dataLoader');
const { applyFilters, applySearch, applySorting, applyPagination } = require('../utils/queryUtils');

let transactions = [];

const loadData = async () => {
  transactions = await dataLoader.loadCSV();
  return transactions;
};

const getTransactions = (query) => {
  let result = [...transactions];

  // Apply search
  result = applySearch(result, query);

  // Apply filters
  result = applyFilters(result, query);

  // Apply sorting
  result = applySorting(result, query);

  // Apply pagination
  return applyPagination(result, query);
};

const getTransactionCount = () => transactions.length;

module.exports = {
  loadData,
  getTransactions,
  getTransactionCount
};
