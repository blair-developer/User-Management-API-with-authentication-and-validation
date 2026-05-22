const User = require("../models/User");

const isAdmin = async (req, res, next) => {

    try {

        const user = await User.findById(req.session.userId);

        if (!user || user.role !== "admin") {
            return res.send("Access Denied");
        }

        next();

    } catch (err) {

        console.log(err);

        res.send("Admin middleware error");

    }

};

module.exports = isAdmin;