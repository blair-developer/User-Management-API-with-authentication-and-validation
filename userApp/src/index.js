const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');
const Task = require("./taskModel");
const session = require('express-session');

const app = express();

// ✅ Add session middleware configuration
app.use(session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: false
}));

// Convert data into json format
app.use(express.json());

// Static file
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

// Use EJS as the view engine
app.set("view engine", "ejs");

// ✅ Authentication middleware (Updated to cleanly protect your dashboard routes)
function isAuthenticated(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.redirect("/");
    }
}

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Register User
app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.username,
            password: req.body.password
        }

        const existingUser = await collection.findOne({ name: data.name });

        if (existingUser) {
            return res.send('User already exists. Please choose a different username.');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        await collection.insertMany(data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during registration.");
    }
});

// Login user 
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.send("Username cannot be found");
        }
        
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            return res.send("Wrong password");
        }
        
        // ✅ FIX 1: Explicitly set the userId session field
        req.session.userId = check._id;
        
        // ✅ FIX 2: Always REDIRECT to /home instead of rendering it directly
        res.redirect("/home");
    }
    catch (err) {
        console.error(err);
        res.send("Wrong details");
    }
});

// ✅ ADDED MIDDLEWARE: Protected dashboard route
app.get('/home', isAuthenticated, async (req, res) => {
    try {
        // ✅ FIX 3: Consistent use of req.session.userId
        const tasks = await Task.find({ userId: req.session.userId }); 

        res.render('home', { tasks: tasks }); 
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.render('home', { tasks: [] }); 
    }
});

app.post("/add-task", isAuthenticated, async (req, res) => {
    try {
        await Task.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.session.userId // ✅ FIX 4: Aligned session key lookup
        });
        res.redirect("/home");
    } catch (err) {
        console.error(err);
        res.status(500).send("Could not create task");
    }
});

app.get("/delete-task/:id", isAuthenticated, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/home");
});

app.get("/edit-task/:id", isAuthenticated, async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render("edit", { task });
});

app.post("/edit-task/:id", isAuthenticated, async (req, res) => {
    await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description
    });
    res.redirect("/home");
});

// ✅ BONUS: Clean logout route to clear sessions safely
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
