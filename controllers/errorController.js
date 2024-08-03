// Middleware to handle errors
module.exports = app.use((err, req, res, next) => {
  // This will basically show where the error has happened
  console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.success = err.status || false;

  res.status(err.statusCode).json({
    success: err.success,
    message: err.message,
  });
});
