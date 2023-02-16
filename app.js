const express = require("express");
const cookieParser = require('cookie-parser')
const ErrorHandler = require("./controllers/errorController");
const userRoute = require("./routes/userRoute");
const quizRoute = require("./routes/quizRoute");
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/users", userRoute);
app.use("/api/quiz", quizRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Ok",
  });
});
app.use(ErrorHandler);

module.exports = app;
