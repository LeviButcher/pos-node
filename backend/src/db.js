const mongoose = require('mongoose');

let db;

// if mongodbmemoryserver passed in use that connection
// else use actual server connection
const connectDb = async mongod => new Promise(async (res, rej) => {
  if (db) {
    return res(db);
  }
  let connectionUrl = process.env.DB || 'mongodb://localhost:27017/POS';
  if (mongod) {
    connectionUrl = await mongod.getConnectionString(process.env.TEST_SUITE).catch(e => rej(e));
  }
  await mongoose
    .connect(
      connectionUrl,
      {
        autoReconnect: true,
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
      },
    )
    .catch(e => rej(e));
  db = mongoose.connection;
  return res(db);
});

module.exports = connectDb;
