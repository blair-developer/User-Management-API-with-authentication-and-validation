const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// ROUTES
const bookRoutes = require("./routes/bookRoutes");

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HOME
app.get("/", (req, res) => {
    res.render("index");
});

// BOOK ROUTES
app.use("/books", bookRoutes);

// SERVER
app.listen(PORT, () => {
    console.log(`Library system running on port ${PORT}`);
});