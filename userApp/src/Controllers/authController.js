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

        const data = {
            name: req.body.username,
            password: req.body.password
        };

        const existingUser = await collection.findOne({
            name: data.name
        });

        if (existingUser) {
            return res.send("User already exists. Please choose a different username.");
        }

        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(
            data.password,
            saltRounds
        );

        data.password = hashedPassword;

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

        if (!check) {
            return res.send("Username cannot be found");
        }

        const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            check.password
        );

        if (!isPasswordMatch) {
            return res.send("Wrong password");
        }
         //Stores ID
        req.session.userId = check._id;

        // Store username
        req.session.username = check.name;

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