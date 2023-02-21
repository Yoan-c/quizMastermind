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

const decodedToken = (token) => {
  const { id } = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  return id;
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

exports.logout = catchAsync(async (req, res, next) => {
  if (req.cookies && req.cookies.jwt) {
    res.clearCookie("jwt", { expires: new Date(Date.now() - 5000) });
  }

  res.status(200).json({
    status: "success",
    message: "Disconected",
  });
});

exports.proctect = catchAsync(async (req, res, next) => {
  
  if (req.cookies && req.cookies.jwt) {
    const id = decodedToken(req.cookies.jwt);
    const user = await User.findById(id);
    
    if (user) {
      req.user = user;
      return next();
    }
  }
  return next(new AppError("Vous n'êtes pas connecté", 401));
});
