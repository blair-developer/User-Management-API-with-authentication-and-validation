// src/controllers/authController.js

const collection = require("../models/User");

const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {

    res.render("login");

};

exports.getSignup = (req, res) => {

    res.render("signup");

};

exports.signupUser = async (req, res) => {

    try {

        // ✅ Check password confirmation
        if (req.body.password !== req.body.confirmPassword) {

            return res.send("Passwords do not match");

        }

        // ✅ Collect signup data
        const data = {

            fullname: req.body.fullname,

            name: req.body.username,

            email: req.body.email,

            profileImage: req.body.profileImage,

            password: req.body.password

        };

        // ✅ Check existing username
        const existingUser = await collection.findOne({

            name: data.name

        });

        if (existingUser) {

            return res.send(
                "User already exists. Please choose a different username."
            );

        }

        // ✅ Check existing email
        const existingEmail = await collection.findOne({

            email: data.email

        });

        if (existingEmail) {

            return res.send(
                "Email already exists. Please use another email."
            );

        }

        // ✅ Hash password
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(

            data.password,

            saltRounds

        );

        data.password = hashedPassword;

        // ✅ Save user
        await collection.insertMany(data);

        res.redirect("/");

    } catch (err) {

        console.error(err);

        res.status(500).send("Error during registration.");

    }

};

exports.loginUser = async (req, res) => {

    try {

        const check = await collection.findOne({

            name: req.body.username

        });

        // ✅ User not found
        if (!check) {

            return res.send("Username cannot be found");

        }

        // ✅ Compare password
        const isPasswordMatch = await bcrypt.compare(

            req.body.password,

            check.password

        );

        if (!isPasswordMatch) {

            return res.send("Wrong password");

        }

        // ✅ Store user session data
        req.session.userId = check._id;

        req.session.username = check.name;

        req.session.fullname = check.fullname;

        req.session.profileImage = check.profileImage;

        // ✅ Redirect to dashboard
        res.redirect("/home");

    } catch (err) {

        console.error(err);

        res.send("Wrong details");

    }

};

exports.logoutUser = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");

    });

};