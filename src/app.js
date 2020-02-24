require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

// set de view engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

//session settings
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000
    }
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const quizzRoutes = require("./routes/quizz");
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
      console.log("Server is running!");
    });
  })
  .catch(console.log);
