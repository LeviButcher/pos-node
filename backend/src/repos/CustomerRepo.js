const errors = require('restify-errors');
const Customer = require('../models/Customer');

// check to make sure that a customer does not exist, then create it
// No Customer should exist with the same first and last name and phonenumber
exports.createCustomer = async function (customer) {
  const repeat = await Customer.findOne({
    firstName: customer.firstName,
    lastName: customer.lastName,
    phone: customer.phone,
  });
  if (repeat) {
    throw new errors.ConflictError('Repeat Customer');
  }
  return Customer.create(customer);
};

exports.findCustomer = async function (firstName, lastName, phone) {
  return await Customer.findOne({
    firstName,
    lastName,
    phone,
  });
};

exports.getCustomer = async function (id) {
  return await Customer.findOne({ _id: id });
};

exports.getCustomers = async function () {
  return await Customer.find();
};

exports.updateCustomer = async function (customer) {
  return await Customer.findOneAndUpdate(customer._id, customer);
};

exports.deleteCustomer = async function (id) {
  return await Customer.findOneAndDelete(id);
};
