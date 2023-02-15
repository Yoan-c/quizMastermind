class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperationel = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
