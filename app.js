const path = require("path");
var favicon = require("serve-favicon");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
const ErrorHandler = require("./controllers/errorController");
const userRoute = require("./routes/userRoute");
const quizRoute = require("./routes/quizRoute");
const viewRoute = require("./routes/viewRoute");
const AppError = require("./utils/appError");

const app = express();
app.use(favicon(path.join(__dirname, "/view/public/images", "favicon.ico")));
app.enable("trust proxy");
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(cors());
app.options("*", cors());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/view/public")));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(compression());
// MIDDLEWARE pour limiter le nombre de requet par IP
// 100 requete / IP en 1h
// permet d'eviter les brute force
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP. please try again in an hour",
});
// il est appliqué sur cette route
app.use("/api", limiter);

app.use("/", viewRoute);
app.use("/api/users", userRoute);
app.use("/api/quiz", quizRoute);

app.use("/api/*", (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});
app.use("*", (req, res, next) => {
  res.render(path.join(__dirname, `./view/pages/error`), {
    title: "Quiz Mastermind",
    data: "",
  });
});
app.use(ErrorHandler);

module.exports = app;
