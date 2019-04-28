const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  sku: String,
  description: String,
  picUrl: String,
  price: Number,
  available: Number,
  quantity: Number
});

module.exports = mongoose.model("Transaction", transactionSchema);
