const connection = require("../config");
var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  try {
    const query = "SELECT * FROM member as m";
    connection.query(query, (error, result) => {
      if (error) {
        return res.status(500).json(error);
      }
      res.send("header", "Access-Control-Allow-Origin: *");
      return res.status(200).json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
});

/* router.post("/", (req, res, next) => {
  const query = ""
  const data = req.body
  connection.query(sql, data, (error, result) => {});
  res
    .status(200)
    .json([
      { name: "Jason" },
      { name: "Eleftheria" },
      { name: "Gennadios" },
      { name: "Lysimachos" },
    ]);
  next();
}); */

module.exports = router;
