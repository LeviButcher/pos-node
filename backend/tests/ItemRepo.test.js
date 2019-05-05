const Item = require("../src/models/Item");
const ItemRepo = require("../src/repos/ItemRepo");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const seedItems = require("../src/seed/items");

process.env.TEST_SUITE = "ITEM_REPO";

describe("Item Repo", () => {
  test("CreateItem should create a new item", async () => {
    const newItem = {
      sku: "13546",
      description: "Hopes and dreams",
      available: 10,
      price: 5.0
    };
    const createdItem = await ItemRepo.createItem(newItem);
    expect(createdItem.sku).toBe(newItem.sku);
  });
  // TODO: Add test of validation of repeat skus
  test.todo("CreatItem should tell when a sku already exists in DB");

  test("getItems should return back collection of items of length of seed data", async () => {
    const items = await ItemRepo.getItems();
    expect(items.length).toBe(seedItems.length);
  });

  test("getItem should return back the item that matches the Id passed in", async () => {
    const knownItem = await Item.findOne({});

    const item = await ItemRepo.getItem(knownItem._id);
    expect(item).toEqual(knownItem);
  });

  test("updateItem should update a item", async () => {
    const item = (await ItemRepo.getItems())[0];
    const res = await ItemRepo.updateItem(item);
    expect(res.toJSON()).toEqual(item.toJSON());
  });

  test("findItem should return back item with the passed in sku", async () => {
    const knownItem = await Item.findOne({});
    const foundItem = await ItemRepo.findItem(knownItem.sku);
    expect(knownItem).toEqual(foundItem);
  });

  test("deleteItem should delete item with matching Id", async () => {
    const rowCount = (await ItemRepo.getItems()).length;
    const knownItem = await Item.findOne({});
    await ItemRepo.deleteItem(knownItem._id);
    const afterDeleteCount = (await ItemRepo.getItems()).length;
    expect(rowCount).toBeGreaterThan(afterDeleteCount);
  });
});
