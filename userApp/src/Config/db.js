require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");

const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("Cloud Database Connected Successfully 🚀");
    } catch (err) {
        console.error("Database connection failed ❌:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;