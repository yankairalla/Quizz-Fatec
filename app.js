require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res, next) => {
  res.send("<h1>Oi</h1>");
});

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
 
  })
  .catch(console.log);

  app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
   })   