const Student = require("../models/Student");
const Course = require("../models/Course");

exports.getStats = async (req, res) => {
  const totalStudents = await Student.countDocuments();
  const activeStudents = await Student.countDocuments({ status: "active" });
  const totalCourses = await Course.countDocuments();

  res.json({
    totalStudents,
    activeStudents,
    totalCourses,
    graduates: 0,
    successRate: totalStudents ? 80 : 0,
  });
};