const express = require('express');
const morgan = require('morgan');

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

// Custom Middleware
app.use((req, res, next) => {
  console.log(`Hello from the middleware`);
  next();
});
app.use((req, res, next) => {
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

// start server
module.exports = app;
