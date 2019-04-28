const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  customer: {
    firstName: String,
    lastName: String,
    address: {
      streetAddress: String,
      city: String,
      state: String,
      zipCode: Number,
      phone: Number
    }
  },
  cartItems: [
    {
      sku: String,
      description: String,
      picUrl: String,
      price: Number,
      available: Number,
      quantity: Number
    }
  ],
  payment: {
    amountPayed: Number,
    paymentType: String
  }
});

module.export = mongoose.model("Transaction", transactionSchema);
