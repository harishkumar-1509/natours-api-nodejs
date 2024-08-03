class AppError extends Error {
  constructor(message, statusCode) {
    // The parent class takes the error and what ever is the message will be passed as the error to the parent class
    super(message);

    this.success = false;
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
