const router = require("express").Router();
const Student = require("../models/studentModel");
const Course = require("../models/courseModel");

// GET DASHBOARD STATS
router.get("/stats", async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ status: "active" });
    const totalCourses = await Course.countDocuments();
    const activeCourses = await Course.countDocuments({ status: "active" });

    const graduates = await Student.countDocuments({ status: "inactive" });

    const successRate =
      totalStudents > 0
        ? Math.round((graduates / totalStudents) * 100)
        : 0;

    res.json({
      totalStudents,
      activeStudents,
      totalCourses,
      activeCourses,
      graduates,
      successRate,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;