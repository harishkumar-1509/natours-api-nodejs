const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// middleware
// This is required to get the request body json

// 3rd party middleware
// Used for logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Custom Middleware
app.use((req, res, next) => {
  console.log(`Hello from the middleware`);
  next();
});
app.use((req, res, next) => {
  console.log(`Setting the requestTime...`);
  req.requestTime = new Date().toISOString();
  next();
});

app.get('/', (req, res) => {
  console.log(req.requestTime); // Variable from the middle ware
  res
    .status(200)
    .json({ message: `Hello from the server side`, app: 'natours' });
});

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);

// In the below URl, suppose we set the url as follows: /api/v1/tours/:id/:x?
// then that '?' is to set the optional parameter
// app.get('/api/v1/tours/:id', getTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// To handle invalid url requests
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   success: false,
  //   message: `Can't find the url ${req.originalUrl} on this server`,
  // });

  // const err = new Error(`Can't find the url ${req.originalUrl} on this server`);
  // err.success = false;
  // err.statusCode = 404;

  next(
    new AppError(`Can't find the url ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalErrorHandler);
// start server
module.exports = app;
