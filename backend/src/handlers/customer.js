const CustomerRepo = require("../repos/CustomerRepo");
const Customer = require("../models/Customer");

exports.getCustomers = async (req, res) => {
  const customers = await CustomerRepo.getCustomers();
  res.send(customers);
};

exports.createCustomer = async (req, res) => {
  const { body } = req;
  const customer = new Customer(body);
  try {
    const result = await CustomerRepo.createCustomer(customer);
    res.send(201, result);
  } catch (e) {
    res.send(409, { message: e.message });
  }
};
