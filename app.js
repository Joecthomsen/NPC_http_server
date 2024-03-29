var createError = require("http-errors");
var express = require("express");
const bodyParser = require("body-parser");
var path = require("path");
var cookieParser = require("cookie-parser");
require("dotenv").config();
var logger = require("morgan");
const { connect } = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var controleGearRouter = require("./routes/controllerRoutes");
const verify_middleware = require("./service/verify_token");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/verify", verify_middleware.verifyUserToken);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/controller", controleGearRouter);

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

connect("mongodb://npc_root:ImASillyPassword!@mongo:27017/NPC_Database", {
  authSource: "admin",
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err.message);
  });

// connect(
//   `mongodb://npc_root:ImASillyPassword!@${process.env.DB_HOST}:27017/NPC_Database`,
//   {
//     authSource: "admin",
//   }
// )
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB: ", err.message);
//   });

module.exports = app;
