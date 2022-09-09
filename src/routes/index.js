const express = require("express");
const users = require("./userRoute");
const books = require("./bookRoute");
const cors = require('cors');

module.exports = (app) => {
  app.use(express.json());
  app.use(cors())
  app.use(users);
  app.use(books);

  app.get("/", (req, res) => {
    res.send("teste");
  });
};
