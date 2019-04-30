const Item = require("../models/Item");

exports.createItem = async item => {
  return await Item.create(item);
};

exports.getItems = () => {};

exports.getItem = () => {};

exports.updateItem = () => {};

exports.findItem = sku => {};

exports.deleteItem = () => {};
