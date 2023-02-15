const User = require("../models/userModel");

exports.createUser = async (req, res, next) => {
  const { pseudo, email, password, confirmPassword } = req.body;
  try {
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
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: `Une erreur s'est produite, veuillez réessayez plus tard`,
      err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params;

  try {
    await User.deleteOne({ id });
  } catch (err) {
    console.log(`Error saving user ${err}`);
  }
  res.status(204).json({
    status: "success",
  });
};
