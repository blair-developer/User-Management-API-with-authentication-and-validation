const Course = require("../models/courseModel");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find().sort({ name: 1 });
  res.json(courses);
};