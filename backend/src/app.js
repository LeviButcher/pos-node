// set up file for restify server
const restify = require("restify");
const CustomerHandler = require("./handlers/CustomerHandler");
const ItemHandler = require("./handlers/ItemHandler");
const TransactionHandler = require("./handlers/TransactionHandler");
const corsMiddleware = require("restify-cors-middleware");
const bunyan = require("bunyan");
const log = bunyan.createLogger({ name: "POS-REST-API" });

const server = restify.createServer({
  name: "POS-REST-API",
  log
});

const cors = corsMiddleware({
  origins: ["*"]
});

server.pre(function(request, response, next) {
  request.log.info({ req: request }, "start"); // (1)
  return next();
});

server.on("after", function(req, res, route) {
  req.log.info({ res: res }, "finished"); // (3)
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.dateParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

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
