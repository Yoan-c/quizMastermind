const express = require("express");
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(viewController.getQuiz);
router.route("/").get(viewController.loggued, viewController.index);
router
  .route("/login")
  .get(viewController.getFormLogin)
  .post(viewController.login);
router.route("/logout").get(viewController.logout);
router.route("/signup").get(viewController.getFormSignUp);

router.use(viewController.loggued);

router.route("/quiz/:category").get(viewController.startQuiz);

router.route("/quiz").get(viewController.getUserQuiz);
router.route("/profil").get(viewController.getUserProfil);

module.exports = router;
