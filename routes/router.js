var express = require("express");
var router = express.Router();

const members = require("./members");
const index = require("./index");
const users = require("./users");

router.use("/members", members);
router.use("/index", index);
router.use("/users", users);

module.exports = router;
