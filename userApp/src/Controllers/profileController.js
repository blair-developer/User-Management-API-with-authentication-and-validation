const User = require("../models/User");
const Task = require("../models/Task");

exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.session.userId);

        const tasks = await Task.find({
            userId: req.session.userId
        });

        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
            task => task.status === "Completed"
        ).length;

        const pendingTasks = tasks.filter(
            task => task.status === "Pending"
        ).length;

        res.render("profile", {
            user,
            totalTasks,
            completedTasks,
            pendingTasks
        });

    } catch (err) {

        console.error(err);

        res.send("Error loading profile");

    }

};

exports.getEditProfile = async (req, res) => {

    const user = await User.findById(req.session.userId);

    res.render("editProfile", { user });

};

exports.updateProfile = async (req, res) => {

    try {

        await User.findByIdAndUpdate(req.session.userId, {

            fullname: req.body.fullname,

            email: req.body.email,

            profileImage: req.body.profileImage,

            bio: req.body.bio,

            location: req.body.location

        });

        res.redirect("/profile");

    } catch (err) {

        console.error(err);

        res.send("Could not update profile");

    }

};