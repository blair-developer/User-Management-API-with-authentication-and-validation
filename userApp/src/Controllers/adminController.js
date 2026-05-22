const User = require("../models/User");
const Task = require("../models/Task");

exports.getAdminDashboard = async (req, res) => {

    try {

        const users = await User.find();

        const tasks = await Task.find();

        const completedTasks = tasks.filter(
            task => task.status === "Completed"
        ).length;

        const pendingTasks = tasks.filter(
            task => task.status === "Pending"
        ).length;

        res.render("admin/dashboard", {

            users,
            tasks,

            totalUsers: users.length,
            totalTasks: tasks.length,

            completedTasks,
            pendingTasks
        });

    } catch (err) {

        console.log(err);

        res.send("Admin dashboard error");

    }

};

exports.deleteUser = async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);

        res.redirect("/admin/dashboard");

    } catch (err) {

        console.log(err);

        res.send("Could not delete user");

    }

};

exports.deleteTask = async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.redirect("/admin/dashboard");

    } catch (err) {

        console.log(err);

        res.send("Could not delete task");

    }

};