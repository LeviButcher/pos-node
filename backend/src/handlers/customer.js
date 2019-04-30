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

exports.findCustomer = async (req, res) => {
  const { firstName, lastName, phone } = req.query;
  const customer = await CustomerRepo.findCustomer(firstName, lastName, phone);
  res.send(customer);
};

exports.updateCustomer = async (req, res) => {
  const { body } = req;
  const customer = new Customer(body);
  const result = await CustomerRepo.updateCustomer(customer);
  res.send(result);
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  const result = await CustomerRepo.deleteCustomer(id);
  res.send(204);
};
