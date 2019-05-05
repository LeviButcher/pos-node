const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { centsToDecimal, decimalToCents } = require("../util/CentConvertor");
const Customer = require("./Customer");
const CustomerSchema = Customer.schema;
const Item = require("./Item");
const ItemSchema = Item.schema;
const { minimumPayment } = require("../util/CalculatePayment");

//TODO: validate everything exist in database before save
const TransactionSchema = new Schema({
  customer: {
    type: CustomerSchema,
    required: false
  },
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

TransactionSchema.post("save", async function(doc) {
  //iterate over cartItems, update each Item document with a new available taking out quantity
  const updateItems = doc.cartItems.map(cartItem => {
    const item = cartItem.item;
    item.available -= cartItem.quantity;
    return item;
  });
  const updateCommand = updateItems.map(item => {
    return {
      updateOne: {
        filter: { sku: item.sku },
        update: { available: item.available }
      }
    };
  });
  await Item.bulkWrite(updateCommand);
  //ensure customer exists and is created
  const customer = doc.customer;

  if (customer) {
    const foundCust = await Customer.findOne({
      phone: customer.phone,
      firstName: customer.firstName,
      lastName: customer.lastName
    });

    if (foundCust == undefined) {
      const newCustomer = {
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        address: customer.address
      };
      await Customer.create(newCustomer);
    }
  }
});

// Enable Mongoose getter functions
TransactionSchema.set("toObject", { getters: true });
TransactionSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("Transaction", TransactionSchema);
