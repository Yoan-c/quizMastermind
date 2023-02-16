const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: `${process.env.TOKEN_EXPIRE}`,
  });
  return token;
};

const sendToken = (res, id) => {
  const token = createToken(id);
  res.cookie("jwt", token, {
    httpOnly: true,
    expires: `${process.env.TOKEN_EXPIRE}` * 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    status: "success",
    message: "Connected",
  });
};

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

exports.login = catchAsync(async (req, res, next) => {
  const { pseudo, email, password } = req.body;
  let user;
  if (!pseudo && !email)
    return next(new AppError("Entrez un email et/ou un pseudo", 400));
  if (!password)
    return next(
      new AppError("Entrez un mot de passe pour vous identifier", 400)
    );
  const idUser = await User.loginUser(email, pseudo, password);
  if (!idUser)
    return next(
      new AppError(
        "votre pseudo/email ou votre mot de passe est incorrect",
        401
      )
    );
  sendToken(res, idUser);
});
