const express = require('express')
const users = require("./userRoute")

module.exports= (app)=>{
    app.use(express.json());
    app.use(users)

    app.get("/", (req, res) => {
        res.send("teste");
      });
}