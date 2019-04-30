const Item = require("../models/Item");

exports.createItem = async item => {
  return await Item.create(item);
};

exports.getItems = async () => {
  return await Item.find();
};

exports.getItem = async id => {
  return await Item.findById(id);
};

exports.updateItem = async item => {
  return await Item.findByIdAndUpdate(item._id, item, { new: true });
};

exports.findItem = async sku => {
  return await Item.findOne({ sku: sku });
};

exports.deleteItem = async id => {
  return await Item.findByIdAndDelete(id);
};
