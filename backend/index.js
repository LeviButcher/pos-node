require("dotenv").config();
const server = require("./app");
const db = require("./src/db");
db().then(() => {
  server.listen(8080, () => {
    console.log("ready on %s", server.url);
  });
});
