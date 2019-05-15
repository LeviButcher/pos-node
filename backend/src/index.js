require('dotenv').config();
const debug = require('debug')('app');
const server = require('./app');
const db = require('./db');

db()
  .then(() => {
    server.listen(8080, () => {
      debug('ready on %s', server.url);
    });
  })
  .catch((e) => {
    debug(e);
    process.exit(1);
  });
