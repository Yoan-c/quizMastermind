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

const checkConnection = (req, page) => {
  if (loggued(req)) return page;
  return "index";
};

const sendPage = (req, res, ...obj) => {
  const data = obj[0];
  const { namePage } = obj[0];
  let isLoggued = false;
  isLoggued = loggued(req);
  data.isLoggued = isLoggued;
  data.quizInfo = req.quiz;
  res.render(`${__dirname}/../view/pages/${namePage}`, {
    title: "Quiz Mastermind",
    data,
  });
};

exports.index = (req, res, next) => {
  // RECHERCHER LES QUIZ ET LEUR DESCRIPTION + IMG

  sendPage(req, res, { namePage: "index" });
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
      req.user = user;
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

exports.startQuiz = (req, res, next) => {
  const { category } = req.params;
  let namePage = checkConnection(req, "quiz");

  if (!category) namePage = checkConnection(req, "index");
  sendPage(req, res, { namePage, start: true, category });
};

exports.getUserQuiz = catchAsync(async (req, res, next) => {
  let tabQuiz = [];

  const quizInfo = await QuizInfo.find();
  const quizUser = req.user.quiz;

  quizUser.forEach((el) => {
    if (el.isFinish) {
      const data = {
        nbQuestions: el.nbQuestions,
        score: el.score,
        category: el.category,
        image: "",
      };
      tabQuiz.push(data);
    }
  });
  quizInfo.forEach((el) => {
    tabQuiz.forEach((data) => {
      if (el.category == data.category) data.image = el.image;
    });
  });
  let namePage = checkConnection(req, "quiz");
  sendPage(req, res, { namePage, tabQuiz });
});

exports.getUserProfil = (req, res, next) => {
  let namePage = checkConnection(req, "index");
  const user = {
    pseudo: req.user.pseudo,
    email: req.user.email,
  };
  sendPage(req, res, { namePage, askProfil: true, user });
};
