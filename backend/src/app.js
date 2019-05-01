// set up file for restify server
const restify = require("restify");
const CustomerHandler = require("./handlers/CustomerHandler");
const ItemHandler = require("./handlers/ItemHandler");
const TransactionHandler = require("./handlers/TransactionHandler");

const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.dateParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.bodyParser());

// /customer routes
server.get("/customers", CustomerHandler.getCustomers);
server.post("/customers", CustomerHandler.createCustomer);
server.get("/customers/find", CustomerHandler.findCustomer);
server.put("/customers/:id", CustomerHandler.updateCustomer);
server.del("/customers/:id", CustomerHandler.deleteCustomer);
// TODO: Add getCustomer By ID

// /items routes
server.get("/items", ItemHandler.getItems);
server.post("/items", ItemHandler.createItem);
server.get("/items/:id", ItemHandler.getItem);
server.get("/items/find", ItemHandler.findItem);
server.put("/items/:id", ItemHandler.updateItem);
server.del("/items/:id", ItemHandler.deleteItem);

// /transactions routes
server.get("/transactions", TransactionHandler.getTransactions);
server.post("/transactions", TransactionHandler.createTransaction);

module.exports = server;
