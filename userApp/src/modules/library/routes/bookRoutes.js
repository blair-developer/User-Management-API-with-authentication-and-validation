const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("books/index");
});

module.exports = router;