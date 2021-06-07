var createError = require("http-errors");
var express = require("express");
var path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const routes = require("./routes/router");
const local = "http://localhost:3000";
const frontURL = "https://jason-et-les-argonautes.netlify.app/";
const backURL = "https://les-argonautes-back.herokuapp.com/";
var app = express();
app.use(helmet());
app.use(
  cors({
    origin: [local, frontURL, backURL],
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("header", "Access-Control-Allow-Origin: *");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

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

module.exports = app;
