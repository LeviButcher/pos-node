const Customer = require("../models/Customer");
const customers = require("./customers");
const Item = require("../models/Item");
const items = require("./items");
const Transaction = require("../models/Transaction");
const transactions = require("./transactions");

process.env.DB = "mongodb://localhost:27017/POS";
require("../db")().then(async db => {
  try {
    await Customer.deleteMany();
    await Customer.create(customers);
    console.log("Seeded Customers");
    await Item.deleteMany();
    await Item.create(items);
    console.log("Seeded Items");
    await Transaction.deleteMany();
    await Transaction.create(transactions);
    console.log("Seeded Transactions");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
  process.exit(0);
});
