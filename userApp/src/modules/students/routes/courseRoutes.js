const router = require("express").Router();
const Course = require("../models/courseModel");

// GET
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// CREATE
router.post("/", async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(course);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;