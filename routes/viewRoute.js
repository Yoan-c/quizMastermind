const express = require("express");
const viewController = require("../controllers/viewController");
const router = express.Router();

router.route("/").get(viewController.index);
router
  .route("/login")
  .get(viewController.getFormLogin)
  .post(viewController.login);
router.route("/signup").get(viewController.getFormSignUp);

module.exports = router;
