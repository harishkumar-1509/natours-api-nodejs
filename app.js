const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// middleware
// This is required to get the request body json

// 3rd party middleware
// Used for logging
app.use(morgan('dev'));

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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/', (req, res) => {
  console.log(req.requestTime); // Variable from the middle ware
  res
    .status(200)
    .json({ message: `Hello from the server side`, app: 'natours' });
});

const getAllTours = (req, res) => {
  res.status(200).json({ success: true, data: tours });
};

// Route Handlers
const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // in the req.params, each value is in the string format, so we ahve to convert it to int
  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length)
  if (!tour) {
    res.status(404).json({ success: false, message: `Invalid id: ${id}` });
  }

  res.status(200).json({ success: true, data: tour });
};

const deleteTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // in the req.params, each value is in the string format, so we ahve to convert it to int
  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length)
  if (!tour) {
    res.status(404).json({ success: false, message: `Invalid id: ${id}` });
  }

  res.status(204).json({ success: true, data: null });
};

const addTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  // Adding a new key-value from a different object to a existing object
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ success: true, data: newTour });
    }
  );
  //   res.send('Done');
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    success: false,
    message: `This route is not yet defined`,
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    success: false,
    message: `This route is not yet defined`,
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    success: false,
    message: `This route is not yet defined`,
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    success: false,
    message: `This route is not yet defined`,
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    success: false,
    message: `This route is not yet defined`,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addTour);

// In the below URl, suppose we set the url as follows: /api/v1/tours/:id/:x?
// then that '?' is to set the optional parameter
// app.get('/api/v1/tours/:id', getTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// routes
app.route('/api/v1/tours').get(getAllTours).post(addTour);
app.route('/api/v1/tours/:id').get(getTour).delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

// start server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
