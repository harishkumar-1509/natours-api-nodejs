const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.checkID = (req, res, next, val) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     success: false,
  //     message: 'Invalid Id',
  //   });
  // }
  // next();
};

// exports.checkBody = (req, res, next, val) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid request, name or price missing',
//     });
//   }
//   next();
// };

exports.getAllTours = (req, res) => {
  res.status(200).json({ success: true, data: [] });
};

// Route Handlers
exports.getTour = (req, res) => {
  console.log(req.params);

  // const id = req.params.id * 1; // in the req.params, each value is in the string format, so we ahve to convert it to int
  // const tour = tours.find((el) => el.id === id);
  // // if (id > tours.length)
  // if (!tour) {
  //   res.status(404).json({ success: false, message: `Invalid id: ${id}` });
  // }

  res.status(200).json({ success: true, data: [] });
};

exports.deleteTour = (req, res) => {
  console.log(req.params);

  // const id = req.params.id * 1; // in the req.params, each value is in the string format, so we ahve to convert it to int
  // const tour = tours.find((el) => el.id === id);
  // // if (id > tours.length)
  // if (!tour) {
  //   res.status(404).json({ success: false, message: `Invalid id: ${id}` });
  // }

  res.status(204).json({ success: true, data: null });
};

exports.addTour = (req, res) => {
  //   console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // Adding a new key-value from a different object to a existing object
  // const newTour = Object.assign({ id: newId }, req.body);

  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({ success: true, data: newTour });
  //   }
  // );
  res.send('Done');
};
