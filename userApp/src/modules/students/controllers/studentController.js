const Student = require("../models/studentModel");

const createStudent = async (req, res) => {
    try {
        const student = await Student.create({
            name: "Test Student",
            email: "test@student.com",
            course: "Library System"
        });

        res.status(201).send({
            success: true,
            message: "Student created successfully",
            data: student
        });

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
};

module.exports = { createStudent };