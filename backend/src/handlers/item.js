const ItemRepo = require("../repos/ItemRepo");

exports.getItems = async (req, res) => {
  const items = await ItemRepo.getItems();
  res.send(200, items);
};

exports.createItem = async (req, res) => {
  const item = await ItemRepo.createItem(req.body);
  res.send(201, item);
};

exports.getItem = async (req, res) => {
  const { id } = req.params;
  const foundItem = await ItemRepo.getItem(id);
  res.send(foundItem);
};

exports.findItem = async (req, res) => {
  const { sku } = req.query;
  const foundItem = await ItemRepo.findItem(sku);
  res.send(200, foundItem);
};

exports.updateItem = async (req, res) => {
  const item = req.body;
  const updatedItem = await ItemRepo.updateItem(item);
  res.send(200, updatedItem);
};

exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  await ItemRepo.deleteItem(id);
  res.send(204);
};
