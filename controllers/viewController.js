const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const QuizInfo = require("../models/quizInfoModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const loggued = (req) => {
  let isLoggued = false;
  if (req.isLoggued) isLoggued = req.isLoggued;
  return isLoggued;
};

const sendPage = (req, res, ...obj) => {
  const data = obj[0];
  const { namePage } = obj[0];
  data.quizInfo = req.quiz;
  res.render(`${__dirname}/../view/pages/${namePage}`, {
    title: "Quiz Mastermind",
    data,
  });
};

exports.index = (req, res, next) => {
  // RECHERCHER LES QUIZ ET LEUR DESCRIPTION + IMG
  let isLoggued = false;
  isLoggued = loggued(req);
  sendPage(req, res, { namePage: "index", isLoggued });
};

exports.getFormLogin = (req, res, next) => {
  sendPage(req, res, { namePage: "index", askConnect: "login" });
};
exports.getFormSignUp = (req, res, next) => {
  sendPage(req, res, { namePage: "index", askConnect: "sign up" });
};

exports.login = (req, res, next) => {
  sendPage(req, res, { namePage: "index" });
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

exports.logout = (req, res, next) => {
  if (req.cookies && req.cookies.jwt) {
    res.clearCookie("jwt", { expires: new Date(Date.now() - 5000) });
  }
  sendPage(req, res, { namePage: "index" });
};

exports.getQuiz = catchAsync(async (req, res, next) => {
  const quiz = await QuizInfo.find().select("-_id");
  if (quiz) req.quiz = quiz;
  else req.quiz = null;
  next();
});
