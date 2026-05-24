const express = require("express");
const connectDB = require("../../config/db");

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Student module running on ${PORT}`);
});