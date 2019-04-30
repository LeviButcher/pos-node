// set up file for restify server
const restify = require("restify");
const CustomerHandler = require("./handlers/customer");

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

module.exports = server;
