const User = require("../models/User");

const isAdmin = async (req, res, next) => {

    try {

        if (!req.session.userId) {

            return res.redirect("/login");
        }

        const user = await User.findById(req.session.userId);

        if (!user) {

            return res.redirect("/login");
        }

        if (user.role !== "admin") {

            return res.send("Access Denied");
        }

        next();

    } catch (err) {

        console.log(err);

        res.send("Admin Middleware Error");

    }

};

module.exports = isAdmin;