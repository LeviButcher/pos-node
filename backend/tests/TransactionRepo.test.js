const Transaction = require("../src/models/Transaction");
const Customer = require("../src/models/Customer");
const Item = require("../src/models/Item");
const TransactionRepo = require("../src/repos/TransactionRepo");
const mongoose = require("mongoose");
const seedItems = require("../src/seed/items");
const seedCustomers = require("../src/seed/customers");
const seedTransactions = require("../src/seed/transactions");
const { minimumPayment } = require("../src/util/CalculatePayment");

process.env.TEST_SUITE = "TRANSACTION_REPO";

describe("Transaction Repo", () => {
  test("Create transaction should return new transaction", async () => {
    const cartItems = seedItems.slice(0, 2).map(item => {
      return {
        item,
        quantity: 1
      };
    });

    const transaction = {
      customer: seedCustomers[0],
      cartItems,
      payment: {
        amountPayed: minimumPayment(cartItems)
      }
    };
    const res = await TransactionRepo.createTransaction(transaction);
    expect(res.cartItems.length).toEqual(transaction.cartItems.length);
  });

  test("Create transaction should enfore payment of at least the sum of each item quantity times price", async () => {
    const cartItems = seedItems.slice(0, 2).map(item => {
      return {
        item,
        quantity: Math.floor(
          item.available - Math.random() * item.available - 1
        )
      };
    });
    const atLeastPay = cartItems.reduce(
      (acc, curr) => curr.item.price * curr.quantity,
      0
    );
    const transaction = {
      customer: seedCustomers[0],
      cartItems,
      payment: {
        amountPayed: 0
      }
    };
    try {
      const res = await TransactionRepo.createTransaction(transaction);
    } catch (e) {
      expect(e.errors["payment.amountPayed"].path).toBe("payment.amountPayed");
    }
  });

  test("Create transaction should still create without customer", async () => {
    const cartItems = seedItems.slice(0, 2).map(item => {
      return {
        item,
        quantity: 1
      };
    });

    const transaction = {
      cartItems,
      payment: {
        amountPayed: minimumPayment(cartItems)
      }
    };
    const res = await TransactionRepo.createTransaction(transaction);
    expect(res.cartItems.length).toEqual(transaction.cartItems.length);
  });

  test("getTransactions should return array of length of seedTransactions", async () => {
    const transactions = await TransactionRepo.getTransactions();
    expect(transactions.length).toBe(seedTransactions.length);
  });

  test("createTransaction should take away the number of available items from Item purchased", async () => {
    const item = (await Item.find({}))[0];
    const amountBought = 1;
    const customer = seedCustomers[0];
    const transaction = {
      customer,
      cartItems: [
        {
          item,
          quantity: amountBought
        }
      ],
      payment: {
        amountPayed: 10000
      }
    };
    const res = await TransactionRepo.createTransaction(transaction);
    const updatedItem = await Item.findById(item._id);
    expect(updatedItem.available).toBe(item.available - amountBought);
  });

  test("createTransaction should create a new customer", async () => {
    const item = (await Item.find({}))[0];
    const amountBought = 1;
    const customer = {
      firstName: "Bill",
      lastName: "Bill",
      phone: "304-896-4216"
    };
    const transaction = {
      customer,
      cartItems: [
        {
          item,
          quantity: amountBought
        }
      ],
      payment: {
        amountPayed: 10000
      }
    };
    const res = await TransactionRepo.createTransaction(transaction);
    const createCustomer = await Customer.findOne(customer);
    expect(createCustomer.phone).toBe(customer.phone);
  });
});
