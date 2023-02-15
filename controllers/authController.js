const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

exports.createUser = catchAsync(async (req, res, next) => {
  const { pseudo, email, password, confirmPassword } = req.body;
  const user = await User.create({
    pseudo,
    email,
    password,
    confirmPassword,
  });

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const id = req.params;

  await User.deleteOne({ id });
  res.status(204).json({
    status: "success",
  });
});
