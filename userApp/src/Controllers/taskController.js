const Task = require("../models/Task");

exports.getHome = async (req, res) => {

    try {

        // ✅ Query object for filtering
        const query = {

            userId: req.session.userId

        };

        // ✅ Filter by status
        if (req.query.status) {

            query.status = req.query.status;

        }

        // ✅ Filter by category
        if (req.query.category) {

            query.category = req.query.category;

        }

        // ✅ Search by title
        if (req.query.search) {

            query.title = {

                $regex: req.query.search,

                $options: "i"

            };

        }

        // ✅ Fetch tasks
        const tasks = await Task.find(query);

        // ✅ Dashboard statistics
        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(

            task => task.status === "Completed"

        ).length;

        const pendingTasks = tasks.filter(

            task => task.status === "Pending"

        ).length;

        // ✅ Render dashboard
        res.render("home", {

            tasks,

            // User info
            username: req.session.username,

            fullname: req.session.fullname,

            profileImage: req.session.profileImage,

            // Statistics
            totalTasks,

            completedTasks,

            pendingTasks

        });

    } catch (err) {

        console.error("Error fetching tasks:", err);

        res.render("home", {

            tasks: [],

            username: req.session.username,

            fullname: req.session.fullname,

            profileImage: req.session.profileImage,

            totalTasks: 0,

            completedTasks: 0,

            pendingTasks: 0

        });

    }

};

exports.addTask = async (req, res) => {

    try {

        await Task.create({

            title: req.body.title,

            description: req.body.description,

            category: req.body.category,

            status: "Pending",

            userId: req.session.userId

        });

        res.redirect("/home");

    } catch (err) {

        console.error(err);

        res.status(500).send("Could not create task");

    }

};

exports.deleteTask = async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.redirect("/home");

    } catch (err) {

        console.error(err);

        res.status(500).send("Could not delete task");

    }

};

exports.getEditTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        res.render("edit", { task });

    } catch (err) {

        console.error(err);

        res.status(500).send("Error loading edit page");

    }

};

exports.editTask = async (req, res) => {

    try {

        await Task.findByIdAndUpdate(req.params.id, {

            title: req.body.title,

            description: req.body.description,

            category: req.body.category

        });

        res.redirect("/home");

    } catch (err) {

        console.error(err);

        res.status(500).send("Could not update task");

    }

};

// ✅ Mark task as completed
exports.completeTask = async (req, res) => {

    try {

        await Task.findByIdAndUpdate(req.params.id, {

            status: "Completed"

        });

        res.redirect("/home");

    } catch (err) {

        console.error(err);

        res.status(500).send("Could not complete task");

    }

};