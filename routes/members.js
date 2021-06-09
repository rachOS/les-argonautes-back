const connection = require("../config");
var express = require("express");
var router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const query = await "SELECT * FROM member AS m";
    await connection.query(query, (error, result) => {
      return error
        ? res.status(500).json({ error })
        : res.status(200).json(result);
    });
  } catch (error) {
    throw new Error(error);
  }
  await next();
});

router.post("/", async (req, res, next) => {
  const query = await "INSERT INTO `member` SET ? ";
  const data = await req.body;
  try {
    await connection.query(query, [data], (error, result) => {
      return error
        ? res.status(500).json({ error })
        : res.status(200).json(result);
    });
  } catch (error) {
    throw await new Error(error);
  }
  await next();
});

module.exports = router;
