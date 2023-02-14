exports.getUser = (req, res, next) => {
  console.log(`recu info user`);
  res.status(200).json({
    status: "success",
    message: "OK",
  });
};
