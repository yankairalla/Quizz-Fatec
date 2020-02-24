require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// set de view engine
app.set('views', './src/views')
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));


const quizzRoutes = require('./routes/quizz');
app.use(quizzRoutes);

app.get("/", (req, res, next) => {
  res.send("<h1>Oi</h1>");
});


// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port 3000");
     })   
  })
  .catch(console.log);

