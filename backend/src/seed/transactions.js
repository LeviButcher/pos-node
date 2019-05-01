const customers = require("./customers");
const items = require("./items");
const { minimumPayment } = require("../util/CalculatePayment");

function generateTransactions() {
  let count = 0;
  let transactions = [];
  while (count < 50) {
    const cartItems = items.slice(0, 5).map(item => {
      return {
        item,
        quantity: Math.floor(item.available - 1)
      };
    });
    const customerIndex = Math.floor(Math.random() * customers.length);
    const transaction = {
      customer: customers[customerIndex],
      cartItems: cartItems,
      payment: {
        amountPayed: minimumPayment(cartItems) + 10
      }
    };
    transactions.push(transaction);
    count++;
  }
  return transactions;
}

module.exports = generateTransactions();
