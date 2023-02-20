const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ErrorHandler = require("./controllers/errorController");
const userRoute = require("./routes/userRoute");
const quizRoute = require("./routes/quizRoute");
const viewRoute = require("./routes/viewRoute");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.options("*", cors());
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/view/public`));
app.use("/", viewRoute);
app.use("/api/users", userRoute);
app.use("/api/quiz", quizRoute);

app.use("*", (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});
app.use(ErrorHandler);

module.exports = app;
