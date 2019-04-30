const dbConnection = require("../src/db");
const Item = require("../src/models/Item");
const ItemRepo = require("../src/repos/ItemRepo");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

process.env.TEST_SUITE = "ITEM_REPO";

describe("Item Repo", () => {
  beforeEach(async () => {
    await dbConnection();
  });

  afterEach(async () => {
    db = await dbConnection();
    await db.dropDatabase();
  });

  afterAll(async () => {
    db = await dbConnection();
    await db.dropDatabase();
    db.close();
  });

  test("CreateItem should create a new item", async () => {
    const newItem = {
      sku: "13546",
      description: "Hope and dreams",
      available: 10,
      price: 5.0
    };
    const createdItem = await ItemRepo.createItem(newItem);
    expect(createdItem.sku).toBe(newItem.sku);
  });
  // TODO: Add test of validation of repeat skus
});
