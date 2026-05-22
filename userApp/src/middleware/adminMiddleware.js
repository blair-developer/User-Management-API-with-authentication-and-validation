const User = require("../models/User");

const isAdmin = async (req, res, next) => {

    try {

        if (!req.session.userId) {
            return res.redirect("/login");
        }

        const user = await User.findById(req.session.userId);

        console.log(user);

        if (!user) {
            return res.send("No user found");
        }

        if (user.role !== "admin") {
            return res.send("Access Denied");
        }

        next();

    } catch (err) {

        console.log(err);

        res.send("Admin middleware error");

    }

};

module.exports = isAdmin;