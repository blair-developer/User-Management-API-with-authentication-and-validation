const express = require("express");
const connectDB = require("../../config/db");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

// connect database FIRST
connectDB();

app.use(express.json());

// routes
app.use("/student", studentRoutes);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Student module running on ${PORT}`);
});