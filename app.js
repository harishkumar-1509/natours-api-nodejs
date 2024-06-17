const fs = require('fs');
const express = require('express');

const app = express();

// middleware
// This is required to get the request body json
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: `Hello from the server side`, app: 'natours' });
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ success: true, data: tours });
});

// In the below URl, suppose we set the url as follows: /api/v1/tours/:id/:x?
// then that '?' is to set the optional parameter
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; // in the req.params, each value is in the string format, so we ahve to convert it to int

  // if (id > tours.length)
  if (!tour) {
    res.status(404).json({ success: false, message: `Invalid id: ${id}` });
  }

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({ success: true, data: tour });
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
