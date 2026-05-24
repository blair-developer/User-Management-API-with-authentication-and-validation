const express = require("express");
const router = express.Router();

const { createStudent } = require("../controllers/studentController");

router.get("/create", createStudent);

module.exports = router;