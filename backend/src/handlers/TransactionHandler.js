const TransactionRepo = require("../repos/TransactionRepo");

exports.getTransactions = async (req, res) => {
  const transactions = await TransactionRepo.getTransactions();
  res.send(transactions);
};

exports.createTransaction = async (req, res) => {
  const transaction = req.body;
  const result = await TransactionRepo.createTransaction(transaction);
  res.send(201, result);
};
