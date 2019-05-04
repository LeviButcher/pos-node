const dbConnection = require("../src/db");
const Transaction = require("../src/models/Transaction");
const TransactionRepo = require("../src/repos/TransactionRepo");
const mongoose = require("mongoose");
const seedItems = require("../src/seed/items");
const seedCustomers = require("../src/seed/customers");
const seedTransactions = require("../src/seed/transactions");
const { minimumPayment } = require("../src/util/CalculatePayment");

process.env.TEST_SUITE = "TRANSACTION_REPO";

describe("Transaction Repo", () => {
  beforeEach(async () => {
    db = await dbConnection();
    await db.dropDatabase();
    await Transaction.create(seedTransactions);
  });

  afterEach(async () => {
    db = await dbConnection();
    await db.dropDatabase();
  });

  afterAll(async () => {
    db = await dbConnection();
    await db.dropDatabase();
    db.close();
  });

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
});
