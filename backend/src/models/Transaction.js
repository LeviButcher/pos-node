const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { centsToDecimal, decimalToCents } = require("../util/CentConvertor");
const CustomerSchema = require("./Customer").schema;
const ItemSchema = require("./Item").schema;
const { minimumPayment } = require("../util/CalculatePayment");

//TODO: validate everything exist in database before save
const TransactionSchema = new Schema({
  customer: CustomerSchema,
  cartItems: [
    {
      item: ItemSchema,
      quantity: Number
    }
  ],
  payment: {
    amountPayed: {
      type: Number,
      required: true,
      validate: {
        validator: function(proposedPay) {
          const { cartItems } = this;
          return proposedPay >= minimumPayment(cartItems);
        },
        message: function(props) {
          return "NOT ENOUGH CASH STRANGER";
        }
      }
    }
  }
});

// Enable Mongoose getter functions
TransactionSchema.set("toObject", { getters: true });
TransactionSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
