// set up file for restify server
const restify = require("restify");
const CustomerHandler = require("./handlers/customer");

const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.dateParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.bodyParser());

server.get("/", (req, res, next) => {
  res.send("/customers");
});

server.get("/customers", CustomerHandler.getCustomers);
server.post("/customers", CustomerHandler.createCustomer);

module.exports = server;
