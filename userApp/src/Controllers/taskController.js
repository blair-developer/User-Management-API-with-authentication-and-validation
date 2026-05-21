// src/controllers/taskController.js

const Task = require("../models/Task");

exports.getHome = async (req, res) => {

    try {

        const tasks = await Task.find({
            userId: req.session.userId
        });

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

            tasks: tasks,

            // Username from session
            username: req.session.username,

            // Stats
            totalTasks,
            completedTasks,
            pendingTasks

        });

    } catch (err) {

        console.error("Error fetching tasks:", err);

        res.render("home", {

            tasks: [],

            username: req.session.username,

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
            userId: req.session.userId

        });

        res.redirect("/home");

    } catch (err) {

        console.error(err);

        res.status(500).send("Could not create task");

    }

};

exports.deleteTask = async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);

    res.redirect("/home");

};

exports.getEditTask = async (req, res) => {

    const task = await Task.findById(req.params.id);

    res.render("edit", { task });

};

exports.editTask = async (req, res) => {

    await Task.findByIdAndUpdate(req.params.id, {

        title: req.body.title,
        description: req.body.description

    });

    res.redirect("/home");

};