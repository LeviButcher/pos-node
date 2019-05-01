const Transaction = require("../models/Transaction");

exports.createTransaction = async transaction => {
  return await Transaction.create(transaction);
};

exports.getTransactions = async () => {
  return await Transaction.find();
};
