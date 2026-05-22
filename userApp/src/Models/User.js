const mongoose = require("mongoose");

const Loginschema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    profileImage: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },

    bio: {
        type: String,
        default: "TaskFlow User"
    },

    location: {
        type: String,
        default: "Unknown"
    },

    password: {
        type: String,
        required: true
    },

     role: {
        type: String,
        default: "user"
    }

}, {
    timestamps: true
});

const collection = mongoose.model("users", Loginschema);

module.exports = collection;