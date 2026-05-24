const router = require("express").Router();
const controller = require("../controllers/courseController");

router.post("/", controller.createCourse);
router.get("/", controller.getCourses);

module.exports = router;