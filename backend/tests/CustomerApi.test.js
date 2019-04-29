const request = require("supertest");
const server = require("../src/app");
const Customer = require("../src/models/Customer");
const seedCustomers = require("../src/seed/customers");
const dbConnection = require("../src/db");

describe("Customer API /customer", () => {
  beforeEach(async () => {
    await dbConnection();
    await Customer.create(seedCustomers);
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

  test("GET:/customers should return array", async () => {
    const res = await request(server).get("/customers");
    expect(res.body).toBeInstanceOf(Array);
  });

  test("POST:/customers create new customer should return new customer ", async () => {
    const customer = {
      firstName: "Levi",
      lastName: "Butcher",
      address: {
        streetAddress: "32 fish avenue",
        city: "slimcity",
        state: "WV",
        zip: "42012"
      },
      phone: "304-478-2136"
    };
    const res = await request(server)
      .post("/customers")
      .send(customer);
    expect(res.statusCode).toEqual(201);
    expect(res.body.firstName).toEqual(customer.firstName);
  });

  test("POST:/customers create a repeat customer should return ", async () => {
    const customer = {
      firstName: "Levi",
      lastName: "Butcher",
      address: {
        streetAddress: "32 fish avenue",
        city: "slimcity",
        state: "WV",
        zip: "42012"
      },
      phone: "304-478-2136"
    };
    await request(server)
      .post("/customers")
      .send(customer);
    const res = await request(server)
      .post("/customers")
      .send(customer);
    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("Repeat Customer");
  });
});
