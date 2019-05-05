const request = require("supertest");
const server = require("../src/app");
const Item = require("../src/models/Item");
const seedItems = require("../src/seed/items");

process.env.TEST_SUITE = "ITEM_API";

describe("Item API /items", () => {
  test("GET: /items should return items of a count of seedItems", async () => {
    const response = await request(server).get("/items");
    const items = response.body;
    expect(response.statusCode).toBe(200);
    expect(items.length).toBe(seedItems.length);
  });

  test("POST: /items should create a new item and return a 201 with new item", async () => {
    const newItem = {
      sku: "135462",
      description: "TESTS",
      price: "5.16",
      available: 6
    };
    const response = await request(server)
      .post("/items")
      .send(newItem);
    expect(response.statusCode).toBe(201);
    expect(response.body.sku).toBe(newItem.sku);
  });

  test("GET: /items/:id should return 1 item with matching ID", async () => {
    const item = (await request(server).get("/items")).body[0];
    const { body: foundItem, statusCode } = await request(server).get(
      `/items/${item._id}`
    );
    expect(statusCode).toBe(200);
    expect(foundItem).toEqual(item);
  });

  test("GET: /items/find shoud return 1 item with matching sku", async () => {
    const item = (await request(server).get("/items")).body[0];
    const { body: foundItem, statusCode } = await request(server)
      .get(`/items/find`)
      .query({ sku: item.sku });
    expect(statusCode).toBe(200);
    expect(foundItem).toEqual(item);
  });

  test("PUT: /items/:id will return updated record", async () => {
    const item = (await request(server).get("/items")).body[0];
    item.description = "UFO";
    const { body: updatedItem, statusCode } = await request(server)
      .put(`/items/${item._id}`)
      .send(item);
    expect(statusCode).toBe(200);
    expect(updatedItem).toEqual(item);
  });

  test("DEL: /items/:id will delete the record returning 204", async () => {
    const item = (await request(server).get("/items")).body[0];
    const { statusCode } = await request(server).del(`/items/${item._id}`);
    expect(statusCode).toBe(204);
  });
});
