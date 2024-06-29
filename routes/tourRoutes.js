const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();

// This middleware is only part of the the tour route
// router.param('id', (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
//   next();
// });

router.param('id', tourController.checkID);

router.route('/').get(tourController.getAllTours).post(tourController.addTour);
// .post(tourController.checkBody, tourController.addTour); //tourController.checBody the middleware that'll be executed for the post method route
router
  .route('/:id')
  .get(tourController.getTour)
  .delete(tourController.deleteTour);

module.exports = router;
