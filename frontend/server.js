const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/items/update/:id", (req, res) => {
      const page = "/updateItem";
      app.render(req, res, page, req.params);
    });

    server.get("/items/create", (req, res) => {
      const page = "/createItem";
      app.render(req, res, page);
    });

    //PUT custom pages before this
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
