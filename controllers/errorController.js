module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
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

  if (err.code === 11000) return sendDuplicate(req, res, err);
  if (err.name === "CastError") return sendCastError(req, res, err);
  if (err.name === "ValidationError") return sendValidationError(req, res, err);

  console.log(err);
  res.status(err.statusCode).json({
    status: "Error",
    message: err.message,
    err,
  });
};

const sendDuplicate = (req, res, err) => {
  res.status(400).json({
    status: "Error",
    message: `${Object.keys(err.keyValue)} "${Object.values(err.keyValue)[0]}" existe deja dans la BDD`,
  });
};
const sendCastError = (req, res, err) => {
  res.status(400).json({
    status: "Error",
    message: `Aucune correspondance n'a été trouvée`,
  });
};
const sendValidationError = (req, res, err) => {
  // boucle sur tout les elements erreur et rechercher le message
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = ` ${errors.join('. ')}`;
  res.status(400).json({
    status: "Error",
    message
  });
};
