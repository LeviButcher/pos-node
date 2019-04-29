const Customer = require("../models/Customer");
const customers = require("./customers");

require("../db")().then(async db => {
  try {
    await Customer.deleteMany();
    await Customer.create(customers);
    console.log("Seed Customers");
  } catch {
    process.exit(1);
  }
});
process.exit(0);
