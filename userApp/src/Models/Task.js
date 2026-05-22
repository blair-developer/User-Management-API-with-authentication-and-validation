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

    userId: {
        type: String,
        required: true
    }

},
  {
    timestamps: true
}
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;