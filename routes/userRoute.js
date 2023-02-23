const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const quizController = require("../controllers/quizController");
const router = express.Router();

router.route("/").get(userController.getUser);
router.route("/signup").post(authController.createUser);

router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

router.use(authController.proctect);

router.route("/update").patch(userController.updateUser);
router.route("/updatePassword").patch(userController.updatePassword);

router
  .route("/:id")
  .get(userController.getOneUser)
  .patch(userController.updateOneUser)
  .delete(authController.deleteUser);

module.exports = router;
