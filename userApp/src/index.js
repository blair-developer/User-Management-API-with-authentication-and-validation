const express = require("express");

const path = require("path");

const session = require("express-session");

require("./config/db");

const authRoutes = require("./routes/authRoutes");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(authRoutes);

app.use(taskRoutes);

const port = 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});