const request = require("supertest");
const server = require("../src/app");
const Customer = require("../src/models/Customer");
const seedCustomers = require("../src/seed/customers");
const dbConnection = require("../src/db");

process.env.TEST_SUITE = "CUSTOMER_API";

describe("Customer API /customer", () => {
  beforeEach(async () => {
    const db = await dbConnection();
    await db.dropDatabase();
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

  test("GET:/customers with query of firstName, lastName, and phone should return user", async () => {
    const { firstName, lastName, phone } = seedCustomers[0];
    const findUser = { firstName, lastName, phone };
    const res = await request(server)
      .get("/customers/find")
      .query(findUser);
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toEqual(findUser.firstName);
  });

  test("GET:/customers with query of firstName, lastName, and phone that does not exist should return nothing", async () => {
    const [firstName, lastName, phone] = ["Bob", "Martin", "468-546-3546"];
    const findUser = { firstName, lastName, phone };
    const res = await request(server)
      .get("/customers/find")
      .query(findUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(null);
  });

  test("PUT:/customers/:id should update customer with that id", async () => {
    const customer = (await request(server).get("/customers")).body[0];
    const res = await request(server)
      .put(`/customers/${customer._id}`)
      .send(customer);
    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toEqual(customer.firstName);
  });

  test("DEL:/customers/:id should delete customer with that id", async () => {
    const customer = (await request(server).get("/customers")).body[0];
    const res = await request(server).del(`/customers/${customer._id}`);
    expect(res.statusCode).toBe(204);
  });
});
