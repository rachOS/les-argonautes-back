var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
/* GET home page. */
router.get("/api", function (req, res, next) {
  res.status(200).json({ title: "REACT" });
});

module.exports = router;
