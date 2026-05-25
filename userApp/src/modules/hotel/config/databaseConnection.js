const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

    console.log("MongoDB Connected Successfully 🚀");
  } catch (err) {
    console.log("MongoDB Connection Error");

    console.log(err);

    process.exit(1);
  }
};

module.exports = connectDB;