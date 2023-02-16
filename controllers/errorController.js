module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  console.log(`Error: ${err}`);
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(req, res, err);
  } else {
    res.status(err.statusCode).json({
      status: "Error",
      message: "Une erreur est survenue sur le server",
    });
  }
};

const sendErrorDev = (req, res, err) => {
  if (err.code === 11000) sendDuplicate(req, res, err);
  res.status(err.statusCode).json({
    status: "Error",
    message: err.message,
    err,
  });
};

const sendDuplicate = (req, res, err) => {
  res.status(500).json({
    status: "Error",
    message: `Le champs "${Object.keys(err.keyValue)}" existe deja dans la BDD`,
  });
};
