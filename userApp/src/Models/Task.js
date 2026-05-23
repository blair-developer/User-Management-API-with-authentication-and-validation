const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    category: {
        type: String,
        default: "General"
    },

    status: {
        type: String,
        default: "Pending"
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },

    dueDate: {
        type: Date
    },

    // Task creator
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    // Assigned user
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    // Team workspace
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },

    attachments: [
        {
            type: String
        }
    ]

},
{
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;