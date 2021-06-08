var createError = require("http-errors");
var express = require("express");
var path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const routes = require("./routes/router");
const whiteList = [
  "http://localhost:3000",
  "https://les-argonautes-front.herokuapp.com",
  "https://jason-et-les-argonautes.netlify.app",
  "https://les-argonautes-back.herokuapp.com",
];
var app = express();
app.use(helmet());
const membersOptions = {
  origin: true,
  methods: ["POST", "GET"],
  credentials: true,
  maxAge: 3600,
  preflightContinue: true,
  optionsSuccessStatus: 204,
};
app.use(cors(membersOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
// conditional test for Heroku PORT
const port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`app listen on port ${port}`);
});
module.exports = app;
