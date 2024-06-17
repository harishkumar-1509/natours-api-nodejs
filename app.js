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
