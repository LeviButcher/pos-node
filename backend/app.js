// set up file for restify server
const restify = require("restify");
const CatHandler = require("./src/handlers/sample");

const server = restify.createServer();

server.get("/", (req, res, next) => {
  console.log("req", req);
  res.send("hello sweet world");
});

server.get("/cat", CatHandler.getCat);
server.post("/cat", CatHandler.createCat);

module.exports = server;
