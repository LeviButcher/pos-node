const mongoose = require("mongoose");
let db;
const connectDb = async () => {
  return new Promise(async (res, rej) => {
    if (db) {
      return res(db);
    }
    await mongoose.connect(
      process.env.DB || "mongodb://localhost:27017/POS",
      {
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
      }
    );

    db = mongoose.connection;
    res(db);
  });
};

module.exports = connectDb;
