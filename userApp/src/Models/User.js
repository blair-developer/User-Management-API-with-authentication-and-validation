const mongoose = require("mongoose");

const Loginschema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

});

const collection = mongoose.model("users", Loginschema);

module.exports = collection;