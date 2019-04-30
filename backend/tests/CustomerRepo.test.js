const dbConnection = require("../src/db");
const Customer = require("../src/models/Customer");
const CustomerRepo = require("../src/repos/CustomerRepo");
const seedCustomers = require("../src/seed/customers");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

process.env.TEST_SUITE = "CUSTOMER_REPO";

describe("Customer Repo", () => {
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

  test("createCustomer add new customer should pass", async () => {
    const cust = new Customer({
      firstName: "Bob",
      lastName: "Bupr",
      phone: "304-532-4132"
    });

    const res = await CustomerRepo.createCustomer(cust);
    expect(res).toBeDefined();
  });

  test("createCustomer add a repeat customer should fail", async () => {
    const cust = new Customer({
      firstName: "Bob",
      lastName: "Bupr",
      phone: "304-532-4132"
    });
    await CustomerRepo.createCustomer(cust);
    // try to create customer again
    try {
      await CustomerRepo.createCustomer(cust);
    } catch (e) {
      expect(e.message).toMatch("Repeat Customer");
    }
  });

  test("findCustomer should pass", async () => {
    const cust = new Customer({
      firstName: "Bob",
      lastName: "Bupr",
      phone: "304-532-4132"
    });

    await CustomerRepo.createCustomer(cust);
    const foundCust = await CustomerRepo.findCustomer(
      "Bob",
      "Bupr",
      "304-532-4132"
    );
    expect(foundCust).not.toBeNull();
  });

  test("getCustomer with Id that exists should pass", async () => {
    const cust = (await Customer.find({}))[0];
    const retrievedCust = await CustomerRepo.getCustomer(cust._id);
    expect(retrievedCust.toJSON()).toEqual(cust.toJSON());
  });

  test("getCustomer with Id that does not exists should equal null", async () => {
    const cust = await CustomerRepo.getCustomer(new ObjectId());
    expect(cust).toBeNull();
  });

  test("getCustomers will return all customers should pass", async () => {
    const custs = await CustomerRepo.getCustomers();
    expect(custs.length).toEqual(seedCustomers.length);
  });

  test("updateCustomer will update customer should pass", async () => {
    const cust = (await CustomerRepo.getCustomers())[0];
    cust.firstName = "Mary Sue";
    await CustomerRepo.updateCustomer(cust);
    const dbCust = await CustomerRepo.getCustomer(cust._id);
    expect(dbCust.toJSON()).toEqual(cust.toJSON());
  });

  test("deleteCustomer will delete customer should pass", async () => {
    const rowCount = (await CustomerRepo.getCustomers()).length;
    const custToDelete = (await CustomerRepo.getCustomers())[0];
    await CustomerRepo.deleteCustomer(custToDelete._id);
    const newRowCount = (await CustomerRepo.getCustomers()).length;
    expect(newRowCount).toBeLessThan(rowCount);
  });
});
