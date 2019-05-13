const { MongoMemoryServer } = require('mongodb-memory-server');
const Transaction = require('../src/models/Transaction');
const Customer = require('../src/models/Customer');
const Item = require('../src/models/Item');
const seedItems = require('../src/seed/items');
const seedCustomers = require('../src/seed/customers');
const seedTransactions = require('../src/seed/transactions');
const connectDb = require('../src/db');

const mongod = new MongoMemoryServer();

// setups DB connection before all tests for mongoose

beforeEach(async (done) => {
  const db = await connectDb(mongod);
  await db.dropDatabase();
  await Customer.create(seedCustomers);
  await Item.create(seedItems);
  await Transaction.create(seedTransactions);
  done();
});

afterEach(async (done) => {
  const db = await connectDb(mongod);
  await db.dropDatabase();
  done();
});

afterAll(async (done) => {
  const db = await connectDb(mongod);
  await db.dropDatabase();
  await db.close();
  await mongod.stop();
  done();
});
