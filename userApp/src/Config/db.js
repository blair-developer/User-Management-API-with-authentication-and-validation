require("dotenv").config();

const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("Cloud Database (userApp) Connected Successfully");
  })
  .catch((err) => {
    console.error("Database cannot be Connected:", err.message);
  });