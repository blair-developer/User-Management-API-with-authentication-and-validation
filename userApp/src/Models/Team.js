const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({

    teamName: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Team", teamSchema);