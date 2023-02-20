const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.index = (req, res, next) => {
  // RECHERCHER LES QUIZ ET LEUR DESCRIPTION + IMG
  res.render(`${__dirname}/../view/pages/index`, {
    title: "Quiz Mastermind",
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
