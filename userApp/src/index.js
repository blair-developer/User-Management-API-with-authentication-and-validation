const express = require("express");
const path = require("path");

const app = express();

// PORT
const PORT = 3000;

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// VIEW ENGINE
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

// HOME ROUTE
app.get("/", (req, res) => {
  res.render("library/index");
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Library Management System running on port ${PORT}`);
});