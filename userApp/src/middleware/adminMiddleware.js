const User = require("../models/User");

const isAdmin = async (req, res, next) => {

    try {

        console.log("ADMIN SESSION:", req.session);

        if (!req.session.userId) {

            return res.redirect("/login");
        }

        const user = await User.findById(req.session.userId);

        console.log("FOUND USER:", user);

        if (!user) {

            return res.send("No user found");
        }

        if (user.role !== "admin") {

            return res.send("Access Denied. Not Admin.");
        }

        next();

    } catch (err) {

        console.log(err);

        res.send("Admin Middleware Error");

    }

};

module.exports = isAdmin;