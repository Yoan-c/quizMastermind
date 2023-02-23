const express = require("express");
const authController = require("../controllers/authController");
const quizController = require("../controllers/quizController");

const router = express.Router();

router.use(authController.proctect);
router.route("/").get(quizController.getAll);
router.route("/:category/start").get(quizController.startQuiz);
router
  .route("/:category/:id")
  .get(quizController.getOneQuestion)
  .post(quizController.answerQuestion);

module.exports = router;
