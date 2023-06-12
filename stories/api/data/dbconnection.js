const mongoose = require("mongoose");
require("dotenv").config();
require("../models/story.model");

mongoose.connect(process.env.DB_ADDRESS + "/" + process.env.DB_NAME);

mongoose.connection.on("connected", function() {
  console.log("Mongoose connnected!");
});

mongoose.connection.on("disconnected", function() {
  console.log("Mongoose disconnnected!");
});