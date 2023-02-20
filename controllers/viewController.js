const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const loggued = (req) => {
  let isLoggued = false;
  if (req.isLoggued) isLoggued = req.isLoggued;
  return isLoggued;
};

exports.index = (req, res, next) => {
  // RECHERCHER LES QUIZ ET LEUR DESCRIPTION + IMG
  let isLoggued = false;
  isLoggued = loggued(req);
  res.render(`${__dirname}/../view/pages/index`, {
    title: "Quiz Mastermind",
    isLoggued,
  });
};

exports.getFormLogin = (req, res, next) => {
  res.render(`${__dirname}/../view/pages/index`, {
    title: "Quiz Mastermind",
    askConnect: "login",
  });
};
exports.getFormSignUp = (req, res, next) => {
  res.render(`${__dirname}/../view/pages/index`, {
    title: "Quiz Mastermind",
    askConnect: "sign up",
  });
};

exports.login = (req, res, next) => {
  res.render(`${__dirname}/../view/pages/index`, {
    title: "Quiz Mastermind",
  });
};

exports.loggued = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      let decoded = await jwt.verify(
        req.cookies.jwt,
        process.env.TOKEN_SECRET_KEY
      );
      const user = await User.findById(decoded.id);
      if (!user) return next();
      req.isLoggued = true;
    }
    next();
  } catch (err) {
    next();
  }
};
