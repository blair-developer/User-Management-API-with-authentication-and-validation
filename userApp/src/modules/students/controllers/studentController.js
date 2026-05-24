const Student = require("../models/studentModel");

// CREATE
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET ALL
exports.getStudents = async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
};

// GET SINGLE (IMPORTANT FOR EDIT)
exports.getStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
};

// UPDATE
exports.updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(student);
};

// DELETE
exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// SEARCH (IMPORTANT FOR YOUR HTML)
exports.searchStudents = async (req, res) => {
  const q = req.query.q;

  const results = await Student.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { course: { $regex: q, $options: "i" } },
    ],
  });

  res.json(results);
};