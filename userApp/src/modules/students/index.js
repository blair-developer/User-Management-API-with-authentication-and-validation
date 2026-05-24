require("dotenv").config();
const express = require("express");
const connectDB = require("../../config/db");

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

const path = require("path");

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

connectDB();

app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Student module running on ${PORT}`);
});