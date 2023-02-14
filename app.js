const express = require("express");
const userRoute = require("./routes/userRoute");
const app = express();

app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Ok",
  });
});

module.exports = app;
