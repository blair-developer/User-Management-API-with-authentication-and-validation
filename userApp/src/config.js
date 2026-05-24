require("dotenv").config();
// Add these two lines at the very top of your server file
const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]); // Forces Cloudflare & Google public DNS resolvers

const mongoose = require('mongoose');

// Updated to target the "userApp" database
//const dbURI = "mongodb+srv://blairdeveloper17_db_user:TuRQqncXuQcKlZos@cluster0.kvqukfq.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0";
// ✅ Use env variable
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("Cloud Database (userApp) Connected Successfully");
  })
  .catch((err) => {
    console.error("Database cannot be Connected:", err.message);
  });

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create collection model
const collection = mongoose.model("users", Loginschema);

module.exports = collection;