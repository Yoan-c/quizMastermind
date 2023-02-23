const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getUser = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    count: users.length,
    users,
  });
});

exports.getOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id, "-__v");
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword) {
    return next(
      new AppError(
        "Veuillez renseignez votre mot de passe et la confirmation",
        400
      )
    );
  }
  const user = await User.findById(id);
  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { email, pseudo } = req.body;

  const user = await User.findById({ _id: req.user.id });
  if (email) user.email = email;
  if (pseudo) user.pseudo = pseudo;
  await User.findByIdAndUpdate({ _id: req.user.id }, user);
  res.status(200).json({
    status: "success",
    user,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword) {
    return next(
      new AppError(
        "Veuillez renseignez votre mot de passe et la confirmation",
        400
      )
    );
  }

  const user = await User.findById({ _id: req.user.id });
  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();
  res.status(200).json({
    status: "success",
    user,
  });
});
