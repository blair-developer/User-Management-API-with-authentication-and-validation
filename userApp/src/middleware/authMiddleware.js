const isAuthenticated = (req, res, next) => {

    console.log("AUTH SESSION:", req.session);

    if (req.session && req.session.userId) {

        return next();

    }

    return res.redirect("/login");

};

module.exports = isAuthenticated;