const Customer = require("../models/Customer");
const customers = require("./customers");
const Item = require("../models/Item");
const items = require("./items");

process.env.DB = "mongodb://localhost:27017/POS";
require("../db")().then(async db => {
  try {
    await Customer.deleteMany();
    await Customer.create(customers);
    console.log("Seed Customers");
    await Item.deleteMany();
    await Item.create(items);
    console.log("Seed Items");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
  process.exit(0);
});
