const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("./passportConfig");
const app = express();
const bodyParser = require("body-parser");
const mongoURI = "mongodb://127.0.0.1:27017/Blog-app";

app.use(bodyParser.json());

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to MongoDB!"))
    .catch((error) => console.log(error));
};

app.use(passport.initialize());
module.exports = connectToMongo;
