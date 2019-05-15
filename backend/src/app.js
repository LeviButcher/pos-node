// set up file for restify server
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const morgan = require('morgan');
const debug = require('debug')('app');
const CustomerHandler = require('./handlers/CustomerHandler');
const ItemHandler = require('./handlers/ItemHandler');
const TransactionHandler = require('./handlers/TransactionHandler');

const server = restify.createServer({
  name: 'POS-REST-API',
});

const cors = corsMiddleware({
  origins: ['*'],
});

// used on routes to catch any async errors
function catchAsyncErrors(callback) {
  return (req, res, next) => {
    callback(req, res).catch(e => next(e));
  };
}

server.use(morgan('dev'));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.dateParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

// /customer routes
server.get('/customers', catchAsyncErrors(CustomerHandler.getCustomers));
server.post('/customers', catchAsyncErrors(CustomerHandler.createCustomer));
server.get('/customers/find', catchAsyncErrors(CustomerHandler.findCustomer));
server.put('/customers/:id', catchAsyncErrors(CustomerHandler.updateCustomer));
server.del('/customers/:id', catchAsyncErrors(CustomerHandler.deleteCustomer));
// TODO: Add getCustomer By ID

// /items routes
server.get('/items', catchAsyncErrors(ItemHandler.getItems));
server.post('/items', catchAsyncErrors(ItemHandler.createItem));
server.get('/items/:id', catchAsyncErrors(ItemHandler.getItem));
server.get('/items/find', catchAsyncErrors(ItemHandler.findItem));
server.put('/items/:id', catchAsyncErrors(ItemHandler.updateItem));
server.del('/items/:id', catchAsyncErrors(ItemHandler.deleteItem));

// /transactions routes
server.get('/transactions', catchAsyncErrors(TransactionHandler.getTransactions));
server.post('/transactions', catchAsyncErrors(TransactionHandler.createTransaction));

server.on('NotFound', (req, res, err, cb) => {
  debug(err);
  cb();
});
server.on('InternalServer', (req, res, err, cb) => {
  debug(err);
  cb();
});
module.exports = server;
