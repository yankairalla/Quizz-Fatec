require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res, next) => {
  res.send("<h1>Oi</h1>");
});

mongoose
  .connect("mongodb://localhost/quizz", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
     console.log("Server is running on port 3000");
    })    
  })
  .catch(console.log);
