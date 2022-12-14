const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const tourRoute = require("./routes/tour.route");

const app = express();

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/api/v1", tourRoute);

//Home route -> when server run
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//Route is found
app.use((req, res, next) => {
  res.status(404).json({
    message: "route is not found",
  });
});

// Server is not found
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "server is not found",
  });
});

module.exports = app;
