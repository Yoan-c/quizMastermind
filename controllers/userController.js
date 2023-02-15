const User = require("../models/userModel");

exports.getUser = async (req, res, next) => {
  console.log(`recu info user`);
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Une erreur est survenu",
    });
  }
};

exports.getOneUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, "-__v");
    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Une erreur est survenu",
      err,
    });
  }
};

exports.updateOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password, confirmPassword } = req.body;
    if (!password || !confirmPassword) {
      throw new Error(
        "Veuillez renseingez votre mot de passe et la confirmation"
      );
    }
    const user = await User.findById(id);
    user.password = password;
    user.confirmPassword = confirmPassword;
    await user.save();

    res.status(200).json({
      status: "success",
      user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "error",
      message: "Une erreur est survenu",
      err: err.message,
    });
  }
};
