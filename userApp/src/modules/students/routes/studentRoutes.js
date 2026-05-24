const router = require("express").Router();
const ctrl = require("../controllers/studentController");

router.get("/", ctrl.getStudents);
router.post("/", ctrl.createStudent);
router.get("/:id", ctrl.getStudent);
router.put("/:id", ctrl.updateStudent);
router.delete("/:id", ctrl.deleteStudent);
router.get("/search", ctrl.searchStudents);

module.exports = router;